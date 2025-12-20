#!/usr/bin/env python3
"""Export book content from repository docs into a single text/markdown file.

Usage:
    python scripts/export_book.py

Output:
    build/book/book.txt
    build/book/book.md
    (optional) build/book/book.pdf if pypandoc + pandoc available
"""
import os
import io
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "build" / "book"
DOC_PATHS = [
    ROOT / "modules",
    ROOT / "docusaurus" / "docs",
    ROOT / "docs",
]


def strip_front_matter(text: str) -> str:
    # remove YAML front matter if present
    return re.sub(r"^---[\s\S]*?---\n", "", text)


def collect_markdown_files() -> list:
    files = []
    seen = set()
    for base in DOC_PATHS:
        if not base.exists():
            continue
        for f in sorted(base.rglob("*.md")):
            rel = f.relative_to(base).as_posix()
            if rel in seen:
                continue
            seen.add(rel)
            files.append(f)
    return files


def export():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    files = collect_markdown_files()
    if not files:
        print("No markdown files found in docusaurus/docs or docs/")
        return

    md_parts = []
    for f in files:
        rel = f.relative_to(ROOT)
        header = f"\n\n# --- FILE: {rel} ---\n\n"
        text = f.read_text(encoding="utf-8")
        text = strip_front_matter(text)
        md_parts.append(header + text)

    book_md = "\n".join(md_parts)
    book_txt = "\n".join([re.sub(r"\n+", "\n", p) for p in md_parts])

    (OUT_DIR / "book.md").write_text(book_md, encoding="utf-8")
    (OUT_DIR / "book.txt").write_text(book_txt, encoding="utf-8")

    print(f"Wrote: {OUT_DIR / 'book.md'}")
    print(f"Wrote: {OUT_DIR / 'book.txt'}")

    # try to build pdf if pypandoc + pandoc available
    try:
        import pypandoc

        pdf_path = OUT_DIR / "book.pdf"
        pypandoc.convert_text(book_md, "pdf", format="md", outputfile=str(pdf_path))
        print(f"Wrote: {pdf_path}")
    except Exception as e:
        print("PDF generation skipped (pypandoc/pandoc not available):", e)


if __name__ == "__main__":
    export()
