import { getLatestPosts } from "@/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"

export default async function AuthorsPage() {
  // Get all posts from database
  const allPosts = await getLatestPosts(100)
  
  // Get unique authors from posts
  const authors = Array.from(new Set(allPosts.map((post) => post.author))).map((authorName) => {
    const authorPost = allPosts.find((post) => post.author === authorName)
    return {
      name: authorName,
      image: "/placeholder.svg",
      postCount: allPosts.filter((post) => post.author === authorName).length,
      slug: authorName.toLowerCase().replace(/\s+/g, "-"),
    }
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Authors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the talented writers behind our content. Discover their expertise and explore their articles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/author/${author.slug}`}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <Image
                    src={author.image || "/placeholder.svg"}
                    alt={author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{author.name}</h3>
                <p className="text-gray-600 mb-4">
                  {author.postCount} {author.postCount === 1 ? "article" : "articles"}
                </p>
                <span className="text-blue-600 hover:text-blue-700 font-medium">View Profile →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
