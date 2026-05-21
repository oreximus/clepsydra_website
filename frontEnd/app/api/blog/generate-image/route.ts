import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, excerpt } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.PIXAZO_API_KEY;

    if (!accountId || !apiToken) {
      return NextResponse.json(
        { error: "Missing Cloudflare configuration. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in .env.local" },
        { status: 500 },
      );
    }

    const prompt = `Blog cover image for article titled "${title}". ${excerpt ? `Summary: ${excerpt}` : ""}. Clean, professional, modern tech illustration, flat vector style, blue and navy color scheme, suitable for a software company blog.`;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ prompt }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image generation API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 502 },
      );
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.startsWith("image/")) {
      const buffer = Buffer.from(await response.arrayBuffer());
      const base64 = `data:${contentType};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ imageUrl: base64 });
    }

    const data = await response.json();

    if (data.result?.image) {
      const image = data.result.image;
      const imageUrl = image.startsWith("data:") ? image : `data:image/png;base64,${image}`;
      return NextResponse.json({ imageUrl });
    }

    if (Array.isArray(data.result)) {
      return NextResponse.json({ imageUrl: data.result[0] });
    }

    return NextResponse.json({ error: "Unexpected API response" }, { status: 502 });
  } catch (error) {
    console.error("Generate image error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
