import { redirect } from "next/navigation"
import { requireAuth } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default async function BookmarksPage() {
  let user
  try {
    user = await requireAuth()
  } catch {
    redirect("/auth/login")
  }

  const supabase = await createClient()

  // Get user's bookmarked posts
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select(`
      id,
      created_at,
      posts (
        id,
        title,
        slug,
        excerpt,
        category,
        featured_image,
        published_at,
        reading_time,
        profiles:author_id (
          display_name,
          avatar_url
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookmarks</h1>

          {!bookmarks || bookmarks.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                <p className="text-gray-600 mb-4">Save interesting posts to read them later!</p>
                <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse Posts
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bookmark: any) => {
                const post = bookmark.posts
                return (
                  <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <Image
                            src={post.featured_image || "/placeholder.svg?height=192&width=384"}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <Badge variant="secondary" className="text-blue-600 bg-blue-50 mb-2">
                            {post.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                          {post.excerpt && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>}
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Image
                              src={post.profiles?.avatar_url || "/placeholder.svg?height=20&width=20"}
                              alt={post.profiles?.display_name || "Author"}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span>{post.profiles?.display_name || "Anonymous"}</span>
                            <span>•</span>
                            <span>{post.reading_time || 5} min read</span>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
