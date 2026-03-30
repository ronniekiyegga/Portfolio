import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/shared/components/ui/breadcrumb'
import { formatDate } from '@/shared/utils/format-date'
import { portableTextComponents } from '@/shared/components/sections/content-components'
import { getPostBySlug, getAllPostSlugs } from '@/lib/actions'
import { Slash } from 'lucide-react'

export async function generateStaticParams() {
    const posts = await getAllPostSlugs()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} - Blog`,
        description: post.description,
        openGraph: {
            title: `${post.title} - Blog`,
            description: post.description,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 675,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} - Blog`,
            description: post.description,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 675,
                },
            ],
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="relative mx-auto max-w-5xl px-6">
            <article>
                <header className="mx-auto mb-8 max-w-2xl text-center">
                    <Breadcrumb>
                        <BreadcrumbList className="justify-center gap-0.5 sm:gap-0.5">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash className="-rotate-16" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="text-foreground"
                                    href={`/blog/category/${post.category.slug}`}>
                                    {post.category.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="text-foreground mt-6 text-balance text-3xl font-bold md:text-4xl md:leading-tight lg:text-5xl">{post.title}</h1>
                </header>

                <div className="relative overflow-hidden rounded-xl border shadow shadow-black/5">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={675}
                        className="aspect-video w-full object-cover"
                        priority
                    />
                </div>

                <div className="mx-auto max-w-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b py-6">
                        <div className="flex flex-wrap items-center gap-4">
                            {post.authors.map((author, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[auto_1fr] items-center gap-2">
                                    <div
                                        className="shrink-0 rounded-full p-[2px]"
                                        style={{
                                            background: "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.76) 97.21%)",
                                        }}
                                    >
                                        <div className="aspect-square size-6 overflow-hidden rounded-full bg-card">
                                            <Image
                                                src="/images/profile/Avatar.svg"
                                                alt="Ronnie"
                                                width={24}
                                                height={24}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <span className="text-foreground line-clamp-1 text-sm">Ronnie</span>
                                </div>
                            ))}
                        </div>
                        <time
                            className="text-muted-foreground text-sm"
                            dateTime={new Date(post.publishedAt).toISOString()}>
                            {formatDate(post.publishedAt)}
                        </time>
                    </div>

                    <p className="text-foreground my-16 text-xl md:text-2xl">{post.description}</p>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <PortableText
                            value={post.body}
                            components={portableTextComponents}
                        />
                    </div>
                </div>
            </article>
        </div>
    )
}