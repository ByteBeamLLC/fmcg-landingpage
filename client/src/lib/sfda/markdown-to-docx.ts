/**
 * Convert the SFDA tool markdown output into a DOCX Blob for download.
 *
 * The LLM produces a predictable markdown subset (headings, **bold**,
 * *italic*, `- ` bullets, `1. ` numbered, `---` rules, paragraphs). Tables
 * and code blocks are not used by the prompts, so we don't attempt to render
 * them faithfully — they fall back to plain paragraphs.
 *
 * Arabic documents use `bidirectional: true` and right-aligned text via the
 * `rtl` option on the document.
 */

import {
  AlignmentType,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

interface MdToDocxOptions {
  title?: string;
  rtl?: boolean;
}

function parseInlineRuns(text: string, rtl: boolean): TextRun[] {
  // Strip leading/trailing whitespace once, splitting **bold** and *italic*.
  const parts: TextRun[] = [];
  // Capture **bold** | *italic* | text. Order matters — bold first.
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|[^*]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const segment = match[0];
    if (segment.startsWith("**") && segment.endsWith("**")) {
      parts.push(new TextRun({ text: segment.slice(2, -2), bold: true, rightToLeft: rtl }));
    } else if (segment.startsWith("*") && segment.endsWith("*")) {
      parts.push(new TextRun({ text: segment.slice(1, -1), italics: true, rightToLeft: rtl }));
    } else {
      parts.push(new TextRun({ text: segment, rightToLeft: rtl }));
    }
  }
  if (parts.length === 0) {
    parts.push(new TextRun({ text, rightToLeft: rtl }));
  }
  return parts;
}

function paragraphFor(line: string, rtl: boolean): Paragraph {
  const align = rtl ? AlignmentType.RIGHT : AlignmentType.LEFT;

  if (line.startsWith("# ")) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      bidirectional: rtl,
      alignment: align,
      children: parseInlineRuns(line.slice(2), rtl),
    });
  }
  if (line.startsWith("## ")) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      bidirectional: rtl,
      alignment: align,
      children: parseInlineRuns(line.slice(3), rtl),
    });
  }
  if (line.startsWith("### ")) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      bidirectional: rtl,
      alignment: align,
      children: parseInlineRuns(line.slice(4), rtl),
    });
  }
  if (line.startsWith("- ") || line.startsWith("* ")) {
    return new Paragraph({
      bullet: { level: 0 },
      bidirectional: rtl,
      alignment: align,
      children: parseInlineRuns(line.slice(2), rtl),
    });
  }
  const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
  if (numberedMatch) {
    return new Paragraph({
      numbering: { reference: "sfda-numbering", level: 0 },
      bidirectional: rtl,
      alignment: align,
      children: parseInlineRuns(numberedMatch[2], rtl),
    });
  }
  if (line.trim() === "---" || line.trim() === "***") {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "—".repeat(20) })],
    });
  }
  return new Paragraph({
    bidirectional: rtl,
    alignment: align,
    children: parseInlineRuns(line, rtl),
  });
}

export async function markdownToDocxBlob(
  markdown: string,
  opts: MdToDocxOptions = {}
): Promise<Blob> {
  const rtl = !!opts.rtl;
  const lines = markdown.split("\n");
  const children: Paragraph[] = [];

  if (opts.title) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        bidirectional: rtl,
        alignment: rtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
        children: parseInlineRuns(opts.title, rtl),
      })
    );
  }

  for (const line of lines) {
    if (!line.trim()) {
      children.push(new Paragraph({}));
      continue;
    }
    children.push(paragraphFor(line, rtl));
  }

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "sfda-numbering",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: rtl ? AlignmentType.RIGHT : AlignmentType.LEFT,
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

export function triggerDocxDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".docx") ? filename : `${filename}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
