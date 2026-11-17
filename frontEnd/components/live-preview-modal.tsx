"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface PreviewableProject {
  title: string;
  url: string;
  screenshot?: string;
}

/**
 * Live site inside a card. The page is rendered at a fixed 1440px desktop viewport and
 * scaled to whatever width the card has, so it reads like a normal desktop page instead
 * of a zoomed-in crop.
 */
export function LiveFrame({ url, title }: { url: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-video w-full overflow-hidden bg-white">
      <iframe
        src={url}
        title={`${title} live preview`}
        loading="lazy"
        tabIndex={-1}
        style={{ width: 1440, height: 810, zoom: scale }}
        className="absolute left-0 top-0 border-0 bg-white pointer-events-none"
      />
    </div>
  );
}

/**
 * Popup preview of a portfolio project. Loads the live site when it allows
 * embedding; otherwise shows the stored screenshot (login-only or frame-blocked sites).
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 gap-0 overflow-hidden bg-white" aria-describedby={undefined}>
        <div className="flex items-center gap-3 px-5 py-3 pr-14 border-b border-[#E5EAF4]">
          <DialogTitle className="font-heading text-sm font-semibold text-brand-navy-deep truncate">
            {project.title}
          </DialogTitle>
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
        {project.screenshot ? (
          <div className="relative w-full aspect-[16/10] bg-[#F1F5F9]">
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
          </div>
        ) : (
          <LiveFrame url={project.url} title={project.title} />
        )}
      </DialogContent>
    </Dialog>
  );
}
