import { redirect } from "next/navigation"
import { requireAuth } from "@/lib/auth"
import { getUserPosts } from "@/lib/blog-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function UserPostsPage() {
  let user
  try {
    user = await requireAuth()
  } catch {
    redirect("/auth/login")
  }

  const posts = await getUserPosts(user.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
            <Link href="/dashboard/posts/new">
              <Button>Create New Post</Button>
            </Link>
          </div>

          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">Start sharing your thoughts with the world!</p>
                <Link href="/dashboard/posts/new">
                  <Button>Write Your First Post</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                          <Badge variant="outline">{post.category}</Badge>
                          {post.featured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                        {post.excerpt && <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.publishedAt}</span>
                          <span>{post.readTime}</span>
                          <span>1 view</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link href={`/dashboard/posts/edit/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        {post.status === "published" && (
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
