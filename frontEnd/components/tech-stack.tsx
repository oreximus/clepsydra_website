"use client";

import StackIcon from "tech-stack-icons";

const techStack = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Python", icon: "python" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "aws" },
  { name: "Figma", icon: "figma" },
];

export default function TechStack() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {techStack.map((tech) => (
        <span
          key={tech.name}
          className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-navy bg-white border border-[#E5EAF4] rounded-pill px-4 py-2 shadow-brand-sm hover:shadow-brand-md hover:border-brand-blue/30 transition-all duration-200"
        >
          <StackIcon name={tech.icon} className="size-4 shrink-0" />
          {tech.name}
        </span>
      ))}
    </div>
  );
}
