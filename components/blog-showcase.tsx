import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getLatestPosts } from "@/lib/blog-data"

export async function BlogShowcase() {
  const blogPosts = await getLatestPosts(12)

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Latest Articles
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most recent insights, stories, and knowledge across all categories
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden h-full">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={400}
                      height={240}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs px-2 py-1">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 lg:p-6">
                    {/* Title */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3 sm:mb-4">
                      {/* Author */}
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{post.author}</span>
                      </div>
                      
                      {/* Read Time */}
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">{post.readTime}</span>
                      </div>
                    </div>
                    
                    {/* Read More Link */}
                    <div className="flex items-center text-orange-600 hover:text-orange-700 font-medium text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-200">
                      Read more
                      <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
