import { type NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const systemPrompt = `You are a professional blog writer for Clepsydra Technologies, a software development company.
Generate a high-quality, well-structured blog article in markdown format. The article should be:
- 800-1500 words
- Professional, insightful, and engaging
- Include proper headings (##), paragraphs, and bullet points where appropriate
- Have a clear introduction, body, and conclusion
- Relevant to software development, technology, or business

Return ONLY valid JSON with this structure:
{
  "title": "Article title",
  "excerpt": "A 1-2 sentence summary of the article",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "Full markdown content of the article (without any frontmatter)"
}`;

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
            content: `Write a blog article about: ${topic}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate article" },
        { status: 502 },
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 502 },
      );
    }

    const cleaned = text
      .replace(/```json\n?/gi, "")
      .replace(/```\n?/g, "")
      .trim();

    let article;
    try {
      article = JSON.parse(cleaned);
    } catch {
      const titleMatch = cleaned.match(/title["']?\s*:\s*["']([^"']+)["']/);
      const excerptMatch = cleaned.match(/excerpt["']?\s*:\s*["']([^"']+)["']/);
      article = {
        title: titleMatch?.[1] || topic,
        excerpt: excerptMatch?.[1] || "",
        tags: [],
        content: cleaned,
      };
    }

    if (!article.content || !article.title) {
      return NextResponse.json(
        { error: "Invalid article structure" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      title: article.title,
      excerpt: article.excerpt || article.content.slice(0, 160).replace(/#/g, "").trim(),
      tags: article.tags || [],
      content: article.content,
    });
  } catch (error) {
    console.error("Generate article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
