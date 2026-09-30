const visitorCountFormat = new Intl.NumberFormat("en-GB");

type VisitorCountProps = {
  count: number | null;
  ticked?: boolean;
};

export function VisitorCount({ count, ticked = false }: VisitorCountProps) {
  if (count === null) return null;

  return (
    <span className="visitorCount" data-ticked={ticked || undefined}>
      <span key={count} className="visitorCountValue">
        {visitorCountFormat.format(count)}
      </span>{" "}
      {count === 1 ? "visitor" : "visitors"}
    </span>
  );
}
