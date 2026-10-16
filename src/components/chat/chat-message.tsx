"use client";

import type { ChatMessage } from "@/lib/chat/tools";
import type { TranslationKey } from "@/lib/i18n";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import { useTranslation } from "../i18n-provider";
import type { ChatLinkKind } from "./analytics";

type Part = ChatMessage["parts"][number];
type ProjectCardsPart = Extract<Part, { type: "tool-showProjects" }>;

export type LinkClickHandler = (link: {
  href: string;
  kind: ChatLinkKind;
  project?: string;
}) => void;

function markdownComponents(onLinkClick: LinkClickHandler): Components {
  return {
    a: ({ href = "", children }) => {
      const className =
        "text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary";

      if (href.startsWith("/") && !href.startsWith("//"))
        return (
          <Link
            href={href}
            className={className}
            onClick={() => onLinkClick({ href, kind: "internal" })}
          >
            {children}
          </Link>
        );

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={className}
          onClick={() => onLinkClick({ href, kind: "external" })}
        >
          {children}
        </a>
      );
    },
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => (
      <ul className="mb-2 last:mb-0 list-disc pl-5 space-y-1 marker:text-primary/70">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-2 last:mb-0 list-decimal pl-5 space-y-1 marker:text-gray-500">
        {children}
      </ol>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1 py-0.5 text-[0.85em]">
        {children}
      </code>
    ),
    // Headings, images and raw blocks are flattened to keep bubbles compact
    h1: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
    h2: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
    h3: ({ children }) => <p className="mb-2 font-semibold">{children}</p>,
    img: () => null,
    pre: ({ children }) => <>{children}</>,
  };
}

function ToolStatus({ name }: { name: string }) {
  const { t } = useTranslation();
  const label = t(`chat.tool.${name}` as TranslationKey);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
      <span className="animate-pulse">
        {label.startsWith("chat.") ? t("chat.tool.searchPortfolio") : label}…
      </span>
    </div>
  );
}

function ProjectCards({
  part,
  onLinkClick,
}: {
  part: ProjectCardsPart;
  onLinkClick: LinkClickHandler;
}) {
  if (part.state !== "output-available" || part.output.length === 0)
    return null;

  return (
    <div className="flex flex-col gap-2">
      {part.output.map((project) => (
        <Link
          key={project.url}
          href={project.url}
          onClick={() =>
            onLinkClick({
              href: project.url,
              kind: "project_card",
              project: project.name,
            })
          }
          className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-2 pr-3 transition-colors hover:border-primary/40 hover:bg-white/5"
        >
          <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl bg-white/5">
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0 grow">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-white">
                {project.name}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-gray-500 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">
              {project.summary}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ChatMessageView({
  message,
  streaming,
  onLinkClick,
}: {
  message: ChatMessage;
  streaming: boolean;
  onLinkClick: LinkClickHandler;
}) {
  if (message.role === "user") {
    const text = message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("");

    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-black">
          {text}
        </div>
      </div>
    );
  }

  const components = markdownComponents(onLinkClick);
  const lastIndex = message.parts.length - 1;

  return (
    <div className="flex flex-col items-start gap-2">
      {message.parts.map((part, i) => {
        if (part.type === "text") {
          if (!part.text.trim()) return null;
          return (
            <div
              key={i}
              className="max-w-[90%] break-words rounded-2xl rounded-bl-md bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-gray-200"
            >
              <Markdown components={components}>{part.text}</Markdown>
            </div>
          );
        }

        if (part.type === "tool-showProjects")
          return (
            <div key={i} className="w-[90%]">
              {part.state === "output-available" ? (
                <ProjectCards part={part} onLinkClick={onLinkClick} />
              ) : (
                streaming && <ToolStatus name="showProjects" />
              )}
            </div>
          );

        // Other tools only show progress while they are the latest activity
        if (part.type.startsWith("tool-") && streaming && i === lastIndex)
          return <ToolStatus key={i} name={part.type.slice(5)} />;

        return null;
      })}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/5 px-4 py-3.5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
