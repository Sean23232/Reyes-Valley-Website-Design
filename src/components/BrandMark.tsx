type Props = {
  className?: string;
  tone?: "navy" | "light";
};

/**
 * Custom monogram: a roofline over the "RV" initials, enclosed in a
 * rounded square. Designed specifically for Reyes Valley.
 */
export default function BrandMark({ className = "", tone = "navy" }: Props) {
  const bg = tone === "navy" ? "#0a1b2a" : "#ffffff";
  const fg = tone === "navy" ? "#ffffff" : "#0a1b2a";
  const accent = "#b56c31";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Reyes Valley monogram"
    >
      <rect width="48" height="48" rx="11" fill={bg} />
      <path
        d="M10 21.5 24 11l14 10.5"
        fill="none"
        stroke={accent}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="24"
        y="36"
        textAnchor="middle"
        fontFamily="var(--font-jakarta), system-ui, sans-serif"
        fontSize="15.5"
        fontWeight="700"
        letterSpacing="0.4"
        fill={fg}
      >
        RV
      </text>
    </svg>
  );
}
