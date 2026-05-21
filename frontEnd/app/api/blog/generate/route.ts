import { type NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Extracts a section between a marker and the next marker (or end of string).
 * Uses plain string indexing — no regex — so it reliably handles the last section.
 */
function extractSection(raw: string, marker: string): string {
  const startIdx = raw.indexOf(marker);
  if (startIdx === -1) return "";

  // Content starts after the marker line
  const afterMarker = raw.indexOf("\n", startIdx);
  if (afterMarker === -1) return "";
  const contentStart = afterMarker + 1;

  // Find the next "---SOMETHING---" marker after this one
  const rest = raw.slice(contentStart);
  const nextMarker = rest.search(/\n---[A-Z]/);
  const contentEnd = nextMarker === -1 ? rest.length : nextMarker;

  return rest.slice(0, contentEnd).trim();
}

function extractContent(raw: string): {
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
} {
  const title   = extractSection(raw, "---TITLE---");
  const excerpt = extractSection(raw, "---EXCERPT---");
  const tagsRaw = extractSection(raw, "---TAGS---");
  const content = extractSection(raw, "---CONTENT---");

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (title && content) return { title, excerpt, tags, content };

  // Last-resort fallback: use everything from the first heading onward
  const lines = raw.split("\n");
  const firstHeadingIdx = lines.findIndex(
    (l) => l.startsWith("# ") || l.startsWith("## ")
  );
  const fallbackContent =
    firstHeadingIdx >= 0 ? lines.slice(firstHeadingIdx).join("\n") : raw;
  const cleanTitle = (lines.find((l) => l.trim()) ?? "")
    .replace(/^#+\s*/, "")
    .trim();

  return {
    title:   title   || cleanTitle || "Article",
    excerpt: excerpt || fallbackContent.replace(/[#*`[\]]/g, "").slice(0, 200).trim(),
    tags,
    content: content || fallbackContent,
  };
}

function cleanMarkdown(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .replace(/^[ \t]+$/gm, "")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const systemPrompt = `You are a senior technology writer producing in-depth, authoritative blog articles for Clepsydra Technologies — read by developers, CTOs, and tech-savvy product builders.

════════════════════════════════════════
OUTPUT FORMAT — follow this EXACTLY
════════════════════════════════════════

---TITLE---
Your Article Title Here
---EXCERPT---
2–3 sentence compelling summary.
---TAGS---
tag1, tag2, tag3, tag4
---CONTENT---
[Full article markdown here]

════════════════════════════════════════
ARTICLE STRUCTURE — copy this skeleton
════════════════════════════════════════

## TL;DR

> - First key takeaway (one sentence).
> - Second key takeaway (one sentence).
> - Third key takeaway (one sentence).
> - Fourth key takeaway (one sentence).

## Introduction

Opening paragraph (4–6 sentences). Hook the reader, state the problem, explain why it matters right now.

## [Topic-Specific Section Heading]

### [Sub-heading if needed]

Paragraph (4–7 sentences). Use **bold** for key terms on first use. Cite claims inline: "According to [GitHub's 2024 Security Report](https://github.blog/security)..."

## [Another Section Heading]

### [Sub-heading if needed]

Paragraph. Use \`code\` for APIs, commands, filenames. Use fenced code blocks where illustrative:

\`\`\`bash
# example command
npm audit --production
\`\`\`

> **Key insight:** Use blockquote callouts for warnings or critical points mid-article.

## [Continue with 4–6 more H2 sections]

## Practical Takeaways

1. First concrete, actionable step developers can take.
2. Second step.
3. Third step.
4. Fourth step.
5. Fifth step.

## Conclusion

Closing paragraph (3–5 sentences) synthesising the article and ending with a forward-looking thought.

## References

1. [Exact Article Title](https://real-url.com) — Organization, Year
2. [Exact Article Title](https://real-url.com) — Organization, Year
3. [Exact Article Title](https://real-url.com) — Organization, Year
4. [Exact Article Title](https://real-url.com) — Organization, Year

════════════════════════════════════════
CRITICAL RULES — violations will break rendering
════════════════════════════════════════

HEADINGS:
✅ ## TL;DR
✅ ## Introduction
✅ ## How the Attack Worked
✅ ### Token Exfiltration
❌ TL;DR                   ← bare text, no ##, WRONG
❌ Introduction             ← bare text, no ##, WRONG
❌ **Introduction**         ← bold is not a heading, WRONG

BLOCKQUOTE (TL;DR bullets):
✅ > - Each bullet starts with "> - "
❌ - Bullet without "> " prefix ← WRONG for TL;DR section

REFERENCES:
✅ 1. [GitHub Security Blog](https://github.blog/2024/security-incident) — GitHub, 2024
❌ 1. GitHub Blog: Security Incident — GitHub, 2024  ← no link, WRONG
❌ - GitHub Blog: Security Incident                  ← wrong format, WRONG

INLINE LINKS — use throughout the article:
✅ According to [GitHub's transparency report](https://github.blog/report)...
❌ According to GitHub's 2024 report...  ← missing link, WRONG

PARAGRAPH LENGTH: 4–7 sentences. No 1–2 sentence micro-paragraphs.
WORD COUNT: 2,000–3,000 words total.
NO filler: no "In today's rapidly evolving...", no "It is worth noting that..."`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Write a comprehensive, deeply informative blog article about: ${topic}

REMINDER: Every section heading MUST start with ## (e.g. "## Introduction", "## How It Works"). TL;DR bullets must use "> - " prefix. References must use [Title](url) markdown links. Do not write bare section names without ## prefix.`,
          },
        ],
        temperature: 0.65,
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate article" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 502 }
      );
    }

    const article = extractContent(text);

    if (!article.content) {
      console.error("Extraction failed. Raw text:", text.slice(0, 500));
      return NextResponse.json(
        { error: "Failed to parse article content. Try again." },
        { status: 502 }
      );
    }

    const markdown = cleanMarkdown(article.content);

    return NextResponse.json({
      title:   article.title   || topic,
      excerpt: article.excerpt || markdown.slice(0, 200).replace(/[#*`\n[\]]/g, " ").trim(),
      tags:    article.tags    || [],
      content: markdown,
    });
  } catch (error) {
    console.error("Generate article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
