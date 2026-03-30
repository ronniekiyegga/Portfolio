'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Post } from '@/types/post'
import { BlogPostGrid } from '@/app/(marketing)/blog/blog-post-grid'

interface CategoryBlogListWithPaginationProps {
    initialPosts: Post[]
    totalCount: number
    loadMoreAction: (offset: number) => Promise<Post[]>
}

export function CategoryBlogListWithPagination({ initialPosts, totalCount, loadMoreAction }: CategoryBlogListWithPaginationProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [isPending, startTransition] = useTransition()
    const hasMore = posts.length < totalCount

    const loadMore = () => {
        startTransition(async () => {
            const newPosts = await loadMoreAction(posts.length)
            setPosts((prev) => [...prev, ...newPosts])
        })
    }

    if (posts.length === 0 && totalCount === 0) {
        return (
            <div className="mx-auto max-w-5xl px-6 py-16 text-center">
                <p className="text-muted-foreground">
                    No posts in this topic yet. Check back later or browse other topics.
                </p>
            </div>
        )
    }

    return (
        <>
            <BlogPostGrid posts={posts} />
            {hasMore && (
                <div className="mx-auto mt-12 max-w-5xl px-6 text-center">
                    <Button
                        onClick={loadMore}
                        disabled={isPending}
                        variant="outline"
                        size="lg">
                        {isPending ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </>
    )
}