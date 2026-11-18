"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Radio } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface PreviewableProject {
  title: string;
  url: string;
  /** Optional same-origin dynamic live preview route for sites that send X-Frame-Options */
  previewUrl?: string;
  /** Static image used when the site cannot be embedded or as fallback if live preview fails */
  screenshot?: string;
}

/**
 * Live site inside a card or modal. Renders at a fixed 1440px desktop viewport and scales
 * cleanly with CSS transform (cross-browser compatible across Chrome, Safari, and Firefox).
 */
export function LiveFrame({
  url,
  title,
  interactive = false,
  fallbackScreenshot,
}: {
  url: string;
  title: string;
  interactive?: boolean;
  fallbackScreenshot?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setScale(width / 1440);
    };
    measure();
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setScale(entry.contentRect.width / 1440);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (failed && fallbackScreenshot) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-[#F1F5F9]">
        <Image
          src={fallbackScreenshot}
          alt={`${title} preview`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden bg-white ${
        interactive ? "h-[72vh] min-h-[460px]" : "aspect-video"
      }`}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#F7F9FC] text-muted-foreground"
        >
          <div className="size-6 rounded-full border-2 border-brand-blue/25 border-t-brand-blue animate-spin" />
          <span className="font-body text-xs">Loading live site…</span>
        </div>
      )}
      {interactive ? (
        <iframe
          src={url}
          title={`${title} live interactive preview`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className="size-full border-0 bg-white"
        />
      ) : (
        <iframe
          src={url}
          title={`${title} live preview`}
          loading="lazy"
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            width: 1440,
            height: 810,
            transform: scale > 0 ? `scale(${scale})` : "scale(0.35)",
            transformOrigin: "top left",
          }}
          className="absolute left-0 top-0 border-0 bg-white pointer-events-none"
        />
      )}
    </div>
  );
}

/**
 * Popup preview of a portfolio project. Loads the live site (directly or via dynamic
 * same-origin preview) and allows interactive scrolling; falls back to screenshot only
 * for login-only or unembeddable apps without a dynamic preview.
 */
export function LivePreviewModal({
  project,
  open,
  onOpenChange,
}: {
  project: PreviewableProject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const frameSrc = project.previewUrl ?? (!project.screenshot ? project.url : undefined);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl p-0 gap-0 overflow-hidden bg-white"
        aria-describedby={undefined}
      >
        <div className="flex items-center gap-3 px-5 py-3 pr-14 border-b border-[#E5EAF4]">
          <DialogTitle className="font-heading text-sm font-semibold text-brand-navy-deep truncate">
            {project.title}
          </DialogTitle>
          {frameSrc && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 font-body text-[11px] font-medium text-emerald-700 shrink-0">
              <Radio className="size-3" />
              Live
            </span>
          )}
          <span className="font-body text-xs text-muted-foreground truncate hidden md:block">
            {project.url.replace(/^https?:\/\//, "")}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 font-body text-xs font-medium text-brand-blue hover:text-brand-navy transition-colors"
          >
            <ExternalLink className="size-3.5" />
            Open in new tab
          </a>
        </div>
        {frameSrc ? (
          <LiveFrame
            url={frameSrc}
            title={project.title}
            interactive
            fallbackScreenshot={project.screenshot}
          />
        ) : project.screenshot ? (
          <div className="relative w-full aspect-[16/10] bg-[#F1F5F9]">
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
