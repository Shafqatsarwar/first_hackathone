#!/usr/bin/env python3
"""Ingest docs with deterministic mock embeddings (safe, no external tokens).

Usage:
  python scripts/ingest_mock.py --dry-run
  python scripts/ingest_mock.py --to-qdrant   # requires QDRANT_URL and QDRANT_API_KEY in env
"""
import os
import sys
import argparse
import hashlib
from pathlib import Path
from typing import List

import numpy as np


def find_files(paths: List[Path], exts={'.md', '.mdx', '.txt', '.html'}):
    files = []
    for p in paths:
        if not p.exists():
            continue
        if p.is_file() and p.suffix.lower() in exts:
            files.append(p)
        else:
            for f in p.rglob('*'):
                if f.suffix.lower() in exts:
                    files.append(f)
    return sorted(files)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding='utf-8')
    except Exception:
        try:
            return path.read_text(encoding='latin-1')
        except Exception:
            return ''


def chunk_text(text: str, words_per_chunk: int = 300):
    words = text.split()
    chunks = []
    for i in range(0, len(words), words_per_chunk):
        chunk = ' '.join(words[i:i+words_per_chunk])
        chunks.append(chunk)
    return chunks


def deterministic_embedding(text: str, dim: int = 128) -> List[float]:
    # Hash the text to get bytes, then expand bytes to desired dim
    h = hashlib.sha256(text.encode('utf-8')).digest()
    # Repeat bytes as necessary
    buf = (h * ((dim // len(h)) + 1))[:dim]
    arr = np.frombuffer(buf, dtype=np.uint8).astype(np.float32)
    # Normalize to [-1, 1]
    vec = (arr / 255.0) * 2.0 - 1.0
    return vec.tolist()


def prepare_points(files, chunk_words=300, dim=128):
    points = []
    total_chunks = 0
    for fi, path in enumerate(files):
        text = read_text(path)
        if not text.strip():
            continue
        chunks = chunk_text(text, words_per_chunk=chunk_words)
        for idx, chunk in enumerate(chunks):
            emb = deterministic_embedding(chunk, dim=dim)
            pid = f"{path.relative_to(Path.cwd())}#{idx}"
            payload = {"source": str(path), "chunk_index": idx}
            points.append({"id": pid, "vector": emb, "payload": payload, "text": chunk})
            total_chunks += 1
    return points, total_chunks


def maybe_send_to_qdrant(points, collection_name='textbook_content_mock', url=None, api_key=None, dim=128):
    try:
        from qdrant_client import QdrantClient
        from qdrant_client.http.models import VectorParams, Distance
    except Exception as e:
        print('qdrant-client not available:', e)
        return False

    url = url or os.getenv('QDRANT_URL')
    api_key = api_key or os.getenv('QDRANT_API_KEY')
    if not url:
        print('QDRANT_URL not provided; aborting Qdrant upload')
        return False

    client = QdrantClient(url=url, api_key=api_key)
    # create collection if not exists
    try:
        client.recreate_collection(collection_name=collection_name, vectors_config={"size": dim, "distance": "Cosine"})
    except Exception:
        try:
            client.create_collection(collection_name=collection_name, vectors_config={"size": dim, "distance": "Cosine"})
        except Exception:
            pass

    # qdrant expects points as list of tuples or models; use upsert
    formatted = []
    for p in points:
        formatted.append((p['id'], p['vector'], p['payload']))

    # batch upsert
    BATCH = 256
    for i in range(0, len(formatted), BATCH):
        batch = formatted[i:i+BATCH]
        client.upsert(collection_name=collection_name, points=[{"id": pid, "vector": vec, "payload": payload} for pid, vec, payload in batch])

    return True


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true', default=False, help='Only report counts and sample embeddings')
    parser.add_argument('--to-qdrant', action='store_true', help='Upload points to Qdrant (requires QDRANT_URL)')
    parser.add_argument('--dim', type=int, default=128, help='Embedding dimension')
    parser.add_argument('--chunk-words', type=int, default=300, help='Words per chunk')
    parser.add_argument('--collection', type=str, default='textbook_content_mock', help='Qdrant collection name')
    args = parser.parse_args(argv)

    repo_root = Path.cwd()
    candidates = [repo_root / 'docusaurus' / 'docs', repo_root / 'docs']
    files = find_files(candidates)
    print(f'Found {len(files)} files to process')

    points, total_chunks = prepare_points(files, chunk_words=args.chunk_words, dim=args.dim)
    print(f'Prepared {total_chunks} chunks (embedding dim={args.dim})')

    if total_chunks > 0:
        sample = points[0]
        print('Sample id:', sample['id'])
        print('Sample payload:', sample['payload'])
        print('Sample text snippet:', sample['text'][:200].replace('\n',' '))
        print('Sample embedding (first 8):', sample['vector'][:8])

    if args.to_qdrant:
        if args.dry_run:
            print('Dry-run requested; skipping Qdrant upload')
        else:
            ok = maybe_send_to_qdrant(points, collection_name=args.collection, dim=args.dim)
            print('Uploaded to Qdrant:', ok)


if __name__ == '__main__':
    main()
