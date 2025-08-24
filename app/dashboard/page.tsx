import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import Link from "next/link"
import { Plus, FileText, Users, Eye, User } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get user's posts
  const { data: userPosts } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get statistics
  const [{ count: totalPosts }, { count: totalViews }] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("author_id", user.id),
    supabase.from("posts").select("view_count", { count: "exact", head: true }).eq("author_id", user.id),
  ])

  const isAdmin = user.email === 'admin@metablog.com'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile?.display_name || user.email}!</h1>
            <p className="text-gray-600">Manage your content and track your blog performance</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link
              href="/dashboard/new-post"
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create New Post</h3>
                  <p className="text-sm text-gray-600">Write and publish a new blog post</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/my-posts"
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">My Posts</h3>
                  <p className="text-sm text-gray-600">View and edit your published posts</p>
                </div>
              </div>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Admin Panel</h3>
                    <p className="text-sm text-gray-600">Manage users and content</p>
                  </div>
                </div>
              </Link>
            )}

            <Link
              href="/dashboard/profile"
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <User className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Edit Profile</h3>
                  <p className="text-sm text-gray-600">Update your display name and info</p>
                </div>
              </div>
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Total Views</h3>
                  <p className="text-2xl font-bold text-gray-900">{totalViews || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Profile</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Display Name:</strong> {profile?.display_name || "Not set"}</p>
                <p><strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                <p><strong>Total Posts:</strong> {totalPosts || 0}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Posts</h3>
              {userPosts && userPosts.length > 0 ? (
                <div className="space-y-2">
                  {userPosts.map((post) => (
                    <div key={post.id} className="text-sm">
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-700">
                        {post.title}
                      </Link>
                      <p className="text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No posts yet. Create your first post!</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Posts Published:</strong> {totalPosts || 0}</p>
                <p><strong>Total Views:</strong> {totalViews || 0}</p>
                <p><strong>Role:</strong> {isAdmin ? "Admin" : "Author"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
