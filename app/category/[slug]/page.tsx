import { getPostsByCategory } from "@/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"

const validCategories = ["lifestyle", "technology", "travel", "business", "economy", "sports", "Lifestyle", "Technology", "Travel", "Business", "Economy", "Sports"]

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const categorySlug = resolvedParams.slug.toLowerCase()

  if (!validCategories.includes(categorySlug)) {
    notFound()
  }

  // Map category slug to proper category name
  const categoryMap: { [key: string]: string } = {
    'lifestyle': 'Lifestyle',
    'technology': 'Technology', 
    'travel': 'Travel',
    'business': 'Business',
    'economy': 'Economy',
    'sports': 'Sports'
  }
  
  const categoryName = categoryMap[categorySlug] || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
  const posts = await getPostsByCategory(categoryName)
  
  // Ensure posts is always an array
  const safePosts = Array.isArray(posts) ? posts : []

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">Explore our latest articles and insights in {categoryName.toLowerCase()}</p>
          <p className="text-sm text-gray-500 mt-2">
            {safePosts.length} article{safePosts.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {safePosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h2>
            <p className="text-gray-600 mb-6">
              We don't have any articles in the {categoryName.toLowerCase()} category yet.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Browse All Posts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {safePosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white text-xs sm:text-sm">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">{post.excerpt}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <Image
                          src="/placeholder.svg"
                          alt={post.author}
                          width={32}
                          height={32}
                          className="rounded-full w-6 h-6 sm:w-8 sm:h-8"
                        />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Back to Blog Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    slug: category,
  }))
}
