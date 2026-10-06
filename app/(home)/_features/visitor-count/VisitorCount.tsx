const visitorCountFormat = new Intl.NumberFormat("en-GB");

type VisitorCountProps = {
  count: number | null;
  ticked?: boolean;
};

export function VisitorCount({ count, ticked = false }: VisitorCountProps) {
  const isLoading = count === null;

  return (
    <span
      className="visitorCount"
      data-ticked={ticked || undefined}
      role="status"
      aria-live="polite"
      aria-busy={isLoading || undefined}
    >
      <span key={count ?? "loading"} className="visitorCountValue">
        {isLoading ? "…" : visitorCountFormat.format(count)}
      </span>{" "}
      {count === 1 ? "visitor" : "visitors"}
    </span>
  );
}
