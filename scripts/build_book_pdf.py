#!/usr/bin/env python3
"""Build a simple PDF `book_context.pdf` by concatenating markdown files under docusaurus/docs and docs/.
This script uses reportlab to render headings and paragraphs.
"""
import os
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

ROOT = Path.cwd()
OUT = ROOT / 'book_context.pdf'

# Collect markdown files
candidates = [ROOT / 'docusaurus' / 'docs', ROOT / 'docs']
files = []
for c in candidates:
    if c.exists():
        for p in sorted(c.rglob('*.md')):
            files.append(p)

if not files:
    print('No markdown files found. Exiting.')
    raise SystemExit(1)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='ChapterTitle', fontSize=18, leading=22, spaceAfter=12, spaceBefore=12))
styles.add(ParagraphStyle(name='Heading1', fontSize=16, leading=20, spaceAfter=8, spaceBefore=8))
styles.add(ParagraphStyle(name='Heading2', fontSize=14, leading=18, spaceAfter=6, spaceBefore=6))
styles.add(ParagraphStyle(name='Body', fontSize=10, leading=14))

story = []
for f in files:
    title = f.stem.replace('-', ' ').replace('_', ' ').title()
    story.append(Paragraph(title, styles['ChapterTitle']))
    text = f.read_text(encoding='utf-8')
    # Simple markdown to paragraphs: split on blank lines, treat headings
    buf = []
    for line in text.splitlines():
        s = line.strip()
        if not s:
            if buf:
                para = ' '.join(buf)
                story.append(Paragraph(para, styles['Body']))
                story.append(Spacer(1, 6))
                buf = []
            continue
        if s.startswith('#'):
            # flush buf first
            if buf:
                para = ' '.join(buf)
                story.append(Paragraph(para, styles['Body']))
                story.append(Spacer(1, 6))
                buf = []
            level = s.count('#')
            heading = s.lstrip('#').strip()
            if level == 1:
                story.append(Paragraph(heading, styles['Heading1']))
            else:
                story.append(Paragraph(heading, styles['Heading2']))
            continue
        # remove markdown links and images lightly
        import re
        line_no_md = re.sub(r'!\[.*?\]\(.*?\)', '', s)
        line_no_md = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', line_no_md)
        buf.append(line_no_md)
    if buf:
        para = ' '.join(buf)
        story.append(Paragraph(para, styles['Body']))
        story.append(Spacer(1, 12))

    # add page break-like spacer
    story.append(Spacer(1, 18))

# Build PDF
print(f'Writing PDF to {OUT}')
SimpleDocTemplate(str(OUT), pagesize=letter).build(story)
print('PDF generation complete')
