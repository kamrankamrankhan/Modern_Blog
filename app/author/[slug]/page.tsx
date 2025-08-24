import { getLatestPosts } from "@/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const resolvedParams = await params
  const authorSlug = resolvedParams.slug
  
  // Get all posts from database
  const allPosts = await getLatestPosts(100) // Get up to 100 posts
  
  // Find posts by author slug
  let authorPosts = []
  let authorDisplayName = 'Unknown Author'
  let authorAvatar = '/placeholder.svg'
  
  // Handle different author slug formats
  if (authorSlug === 'cee' || authorSlug === 'candi') {
    // For CEE or candi, show all posts by the real author
    authorPosts = allPosts.filter((post) => {
      return post.author.toLowerCase() === 'candi'
    })
    authorDisplayName = 'candi'
    // Get avatar from the first post if available
    if (authorPosts.length > 0) {
      authorAvatar = '/placeholder.svg'
    }
  } else {
    // For other authors, try to match by slug
    const authorName = authorSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    authorPosts = allPosts.filter((post) => {
      return post.author.toLowerCase() === authorName.toLowerCase()
    })
    
    if (authorPosts.length > 0) {
      authorDisplayName = authorPosts[0].author
      authorAvatar = '/placeholder.svg'
    }
  }

  if (authorPosts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Author Header */}
        <div className="text-center mb-12">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src={authorAvatar}
              alt={authorDisplayName}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{authorDisplayName}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Author and contributor at CoreEliteExperts.blogs. Passionate about sharing insights on technology, lifestyle, and more.
          </p>
          <div className="text-sm text-gray-500">
            {authorPosts.length} {authorPosts.length === 1 ? "article" : "articles"} published
          </div>
        </div>

        {/* Author's Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles by {authorDisplayName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.publishedAt}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
