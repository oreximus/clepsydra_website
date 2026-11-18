import { NextRequest, NextResponse } from "next/server";

const ALLOWED_SITES: Record<string, string> = {
  tailsinfo: "https://tailsinfo.com",
};

function rewriteRelativeUrls(html: string, origin: string): string {
  // Remove inline and external scripts so cross-origin hydration never fails or executes
  let output = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*as=["']script["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi, "");

  // Rewrite root-relative src / href / poster / action attributes (ignoring protocol-relative //)
  output = output.replace(
    /\b(src|href|poster|action)=(["'])\/(?!\/)/gi,
    `$1=$2${origin}/`
  );

  // Rewrite root-relative entries inside srcset / srcSet attributes
  output = output.replace(
    /\b(srcset|srcSet)=(["'])([\s\S]*?)\2/gi,
    (_match, attr, quote, value: string) => {
      const rewritten = value.replace(
        /(^|,\s*)\/(?!\/)/g,
        `$1${origin}/`
      );
      return `${attr}=${quote}${rewritten}${quote}`;
    }
  );

  // Rewrite CSS url(/...) references
  output = output.replace(
    /url\((["']?)\/(?!\/)/gi,
    `url($1${origin}/`
  );

  // Remove preload links for cross-origin fonts (avoids CORS warnings) and load Figtree via Google Fonts
  output = output.replace(/<link\b[^>]*as=["']font["'][^>]*>/gi, "");

  // Inject <base>, Google Fonts fallback, and reveal-override styles so SSR motion elements render cleanly without JS
  const headInjection = `
    <base href="${origin}/" target="_blank" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" />
    <style data-clepsydra-preview>
      html, body { overflow-x: hidden !important; font-family: 'Figtree', system-ui, -apple-system, sans-serif; }
      [style*="opacity:0"], [style*="opacity: 0"] {
        opacity: 1 !important;
        transform: none !important;
      }
    </style>
  `;

  if (/<head[^>]*>/i.test(output)) {
    output = output.replace(/<head([^>]*)>/i, `<head$1>${headInjection}`);
  } else {
    output = `${headInjection}${output}`;
  }

  return output;
}

export async function GET(request: NextRequest) {
  const siteKey = request.nextUrl.searchParams.get("site") ?? "";
  const origin = ALLOWED_SITES[siteKey];

  if (!origin) {
    return NextResponse.json({ error: "Unsupported preview target" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${origin}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 300 },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${upstream.status}` },
        { status: 502 }
      );
    }

    const rawHtml = await upstream.text();
    const rewrittenHtml = rewriteRelativeUrls(rawHtml, origin);

    return new NextResponse(rewrittenHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": `default-src 'none'; style-src 'unsafe-inline' ${origin} https://fonts.googleapis.com; font-src ${origin} https://fonts.gstatic.com data:; img-src ${origin} https: data: blob:; media-src ${origin} https:; frame-ancestors 'self';`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Preview unavailable" }, { status: 502 });
  }
}
