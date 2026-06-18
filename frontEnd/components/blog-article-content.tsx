"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  coverImage: string;
  content: string;
}

function readingTime(text: string): string {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / wpm));
  return `${min} min read`;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function BlogArticleContent({ post }: { post: PostData }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      }}
    >
      <motion.header variants={sectionVariants} className="mb-10">
        <h1 className="font-heading text-[2rem] md:text-[3rem] font-bold text-brand-navy-deep leading-[1.1] mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground font-body mb-6">
          <span className="flex items-center gap-1.5">
            <User className="size-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {readingTime(post.content)}
          </span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {post.tags.length > 0 && (
          <motion.div variants={sectionVariants} className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 font-body text-xs font-medium text-brand-blue bg-[#EEF6FD] px-3 py-1.5 rounded-full"
              >
                <Tag className="size-3" />
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </motion.header>

      {post.coverImage && (
        <motion.div
          variants={sectionVariants}
          className="relative aspect-[2/1] rounded-xl overflow-hidden mb-12 shadow-brand-md"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      <motion.div variants={sectionVariants} className="max-w-none">
        <MarkdownRenderer content={post.content} />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        className="mt-16 pt-8 border-t border-[#E5EAF4]"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-blue hover:text-brand-navy group active:scale-95 transition-all duration-75"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>
      </motion.div>
    </motion.div>
  );
}
