import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  headingId?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  headingId,
  className = "",
}: Props) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <Reveal
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] ${
            isCenter ? "justify-center" : ""
          } ${isLight ? "text-clay-300" : "text-clay-600"}`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-8 ${isLight ? "bg-clay-300/60" : "bg-clay-500/50"}`}
          />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={`mt-4 text-pretty font-display text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.6rem] ${
          isLight ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <div
          className={`mt-5 text-[1.02rem] leading-relaxed ${
            isLight ? "text-sand-200/85" : "text-ash-700"
          }`}
        >
          {intro}
        </div>
      ) : null}
    </Reveal>
  );
}
