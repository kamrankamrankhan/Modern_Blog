import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getLatestPosts } from "@/lib/blog-data"
import Link from "next/link"
import Image from "next/image"

export async function BlogGrid() {
  const blogPosts = await getLatestPosts(9)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Latest Posts Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Latest from CEE</h2>
      </div>

      {/* Blog Posts Grid */}
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group cursor-pointer">
              <article>
                <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4">
                  <Image
                    src={post.image || "/placeholder.svg?height=240&width=400"}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="w-full h-48 sm:h-52 lg:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Badge variant="secondary" className="text-blue-600 bg-blue-50 text-xs sm:text-sm">
                    {post.category}
                  </Badge>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {/* Author info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={post.author.avatar || "/placeholder.svg?height=24&width=24"}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                      />
                      <span>{post.author.name}</span>
                    </div>
                    <span className="text-gray-400 sm:text-gray-500">{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6">
            We're working on creating amazing content for you. Check back soon!
          </p>
          <Link href="/dashboard/new-post">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Your First Post
            </Button>
          </Link>
        </div>
      )}

      {/* View All Posts Button */}
      <div className="text-center">
        <Link href="/blog">
          <Button variant="outline" className="px-6 sm:px-8 py-2 bg-transparent text-sm sm:text-base">
            View All Posts
          </Button>
        </Link>
      </div>
    </section>
  )
}
