'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Clock } from 'lucide-react'
import { Post } from '@/types/post'
import { formatDateOrdinal } from '@/lib/format-date'

function estimateReadTime(description: string): number {
  const words = description.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return minutes
}

export function BlogPostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((article, index) => {
          const readTime = estimateReadTime(article.description)
          const author = article.authors[0]
          return (
            <article
              key={`${article.title}-${article.date}-${index}`}
              className="group flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground"
            >
              <Link href={`/blog/${article.slug}`} className="block shrink-0">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-xl bg-muted shadow-sm transition-shadow hover:shadow-md">
                  <Image
                    src={article.image}
                    alt=""
                    width={460}
                    height={288}
                    className="size-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={new Date(article.date).toISOString()}>
                    {formatDateOrdinal(article.date)}
                  </time>
                  <span className="select-none" aria-hidden>
                    |
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 shrink-0" aria-hidden />
                    {readTime} minute read
                  </span>
                </div>

                <h2 className="text-lg font-semibold leading-tight tracking-tight">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-foreground hover:underline"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {article.description}
                </p>

                <div className="flex items-center justify-between gap-3 pt-2">
                  {author ? (
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="relative shrink-0 rounded-full p-[2px]"
                        style={{
                          background: "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.76) 97.21%)",
                        }}
                      >
                        <div className="relative size-8 overflow-hidden rounded-full bg-card">
                          <Image
                            src="/Avatar.svg"
                            alt="Ronnie"
                            width={32}
                            height={32}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <span className="truncate text-sm text-muted-foreground">
                        Ronnie
                      </span>
                    </div>
                  ) : (
                    <span />
                  )}
                  <Link
                    href={`/blog/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                    className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-primary/90"
                  >
                    Read
                    <ChevronRight
                      strokeWidth={2.5}
                      aria-hidden
                      className="size-4"
                    />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
