import { Fragment, useState } from "react";
import Icon from "@/components/ui/icon";
import { ArticleBlock } from "./droneProtectionArticle.data";

const TOKEN = /(\*\*[^*]+\*\*|\[\d+\]\(https?:\/\/[^)]+\))/g;

function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) {
          return <strong key={i} className="text-[var(--dark)]">{part.slice(2, -2)}</strong>;
        }
        const m = part.match(/^\[(\d+)\]\((https?:\/\/[^)]+)\)$/);
        if (m) {
          return (
            <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer nofollow" className="text-[var(--blue)] text-xs align-super hover:underline mx-0.5">
              [{m[1]}]
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h3":
      return <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--dark)] mt-10 pt-8 mb-4 border-t border-gray-100">{block.text}</h3>;
    case "h4":
      return <h4 className="font-display font-bold text-lg text-[var(--dark)] mt-8 mb-3">{block.text}</h4>;
    case "p":
      return <p className="text-[var(--gray)] leading-relaxed mb-4"><Inline text={block.text} /></p>;
    case "ul":
      return (
        <ul className="space-y-3 mb-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[var(--blue-50)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Check" size={14} className="text-[var(--blue)]" />
              </div>
              <span className="text-[var(--gray)] text-sm leading-relaxed"><Inline text={item} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3 mb-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[var(--blue)] text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="text-[var(--gray)] text-sm leading-relaxed"><Inline text={item} /></span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-4 rounded-xl border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--blue-50)] text-[var(--dark)]">
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-3 font-display font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-gray-100 align-top">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 leading-relaxed ${ci === 0 ? "font-semibold text-[var(--dark)]" : "text-[var(--gray)]"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

interface Props {
  title: string;
  blocks: ArticleBlock[];
}

export default function CollapsibleArticle({ title, blocks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <article className="mt-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
        <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--dark)] leading-snug">{title}</h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Свернуть статью" : "Развернуть статью"}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--blue)] text-white text-sm font-semibold hover:bg-[var(--blue-dark)] transition-colors"
        >
          <span className="hidden sm:inline">{open ? "Свернуть" : "Развернуть"}</span>
          <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} />
        </button>
      </div>
      {open && (
        <div className="px-5 sm:px-6 pb-6">
          {blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--blue)] text-[var(--blue)] text-sm font-semibold hover:bg-[var(--blue-50)] transition-colors"
            >
              Свернуть
              <Icon name="ChevronUp" size={18} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
