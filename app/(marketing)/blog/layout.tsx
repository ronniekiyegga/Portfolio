export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-background">
      <div className="@container pt-28 pb-16 md:pb-24 md:pt-40">{children}</div>
    </section>
  );
}
