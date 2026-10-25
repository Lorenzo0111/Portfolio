/**
 * Renders a translation string where `*words*` become the italic serif accent.
 */
export function Accent({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em
            key={i}
            className={`font-serif italic font-normal tracking-normal whitespace-nowrap text-gradient pr-[0.05em] ${className}`}
          >
            {part.slice(1, -1)}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}
