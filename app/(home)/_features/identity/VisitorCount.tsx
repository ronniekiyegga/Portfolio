const visitorCountFormat = new Intl.NumberFormat("en-GB");

type VisitorCountProps = {
  count: number | null;
};

export function VisitorCount({ count }: VisitorCountProps) {
  if (count === null) return null;

  return (
    <span className="visitorCount">
      {visitorCountFormat.format(count)}{" "}
      {count === 1 ? "visitor" : "visitors"}
    </span>
  );
}
