import { CategoryBlogListWithPagination } from '@/app/(marketing)/blog/category-blog-list-with-pagination'
import { loadMoreCategoryPosts, getCategoryPosts, getCategoryPostsCount } from '@/lib/actions'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'

const PAGE_SIZE = 9

export async function generateStaticParams() {
    return BLOG_CATEGORIES.map((c) => ({
        category: c.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = await params
    const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug)

    if (!category) {
        return { title: 'Category Not Found' }
    }

    return {
        title: `${category.title} - Blog`,
        description: `Browse ${category.title} articles and insights`,
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params
    const [posts, totalCount] = await Promise.all([
        getCategoryPosts(category, PAGE_SIZE),
        getCategoryPostsCount(category),
    ])

    const loadMoreAction = loadMoreCategoryPosts.bind(null, category)

    return (
        <CategoryBlogListWithPagination
            initialPosts={posts}
            totalCount={totalCount}
            loadMoreAction={loadMoreAction}
        />
    )
}