export default function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className="bg-background text-foreground dark:bg-neutral-950">
            <div className="@container pt-22 pb-16 md:pb-24 md:pt-32">{children}</div>
        </section>
    )
}