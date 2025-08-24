import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"

export default async function AdminPage() {
  try {
    await requireAdmin()
  } catch {
    redirect("/auth/login")
  }

  const supabase = await createClient()

  // Get statistics
  const [{ count: totalUsers }, { count: totalPosts }, { count: totalComments }, { count: pendingComments }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase.from("comments").select("*", { count: "exact", head: true }),
      supabase.from("comments").select("*", { count: "exact", head: true }).is("parent_id", null),
    ])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalUsers || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Posts</CardTitle>
                <CardDescription>Published blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalPosts || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Comments</CardTitle>
                <CardDescription>User comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalComments || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Review</CardTitle>
                <CardDescription>Comments awaiting moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{pendingComments || 0}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage posts, comments, and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="/dashboard/new-post" className="block p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                  <div className="font-medium">Create New Post</div>
                  <div className="text-sm text-gray-600">Write and publish a new blog post</div>
                </a>
                <a href="/admin/posts" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-medium">Manage Posts</div>
                  <div className="text-sm text-gray-600">Review and moderate blog posts</div>
                </a>
                <a
                  href="/admin/comments"
                  className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Moderate Comments</div>
                  <div className="text-sm text-gray-600">Review and approve user comments</div>
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users, roles, and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href="/admin/users"
                  className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Manage Users</div>
                  <div className="text-sm text-gray-600">View and manage user accounts and roles</div>
                </a>
                <a
                  href="/admin/analytics"
                  className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-gray-600">View platform analytics and insights</div>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
