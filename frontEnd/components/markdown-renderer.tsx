"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-gray max-w-none font-body
      prose-headings:font-heading prose-headings:text-brand-navy-deep prose-headings:font-bold
      prose-h2:text-[1.75rem] prose-h2:mt-10 prose-h2:mb-4 prose-h2:leading-tight
      prose-h3:text-[1.25rem] prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-[#374151] prose-p:leading-relaxed prose-p:mb-5
      prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
      prose-strong:text-brand-navy-deep prose-strong:font-semibold
      prose-code:bg-[#EEF2F8] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
      prose-pre:bg-[#0D1B3E] prose-pre:rounded-card prose-pre:p-4
      prose-pre:overflow-x-auto
      prose-li:text-[#374151] prose-li:leading-relaxed
      prose-blockquote:border-l-4 prose-blockquote:border-brand-sky prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
      prose-hr:border-[#E5EAF4]
      prose-img:rounded-card prose-img:shadow-brand-sm
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
