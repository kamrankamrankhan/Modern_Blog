"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface UserProfile {
  id: string
  display_name: string | null
  bio: string | null
  created_at: string
  user_roles: { role: string }[]
}

export default function ManageUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUser()
  }, [params.id])

  const loadUser = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          user_roles (role)
        `)
        .eq("id", params.id)
        .single()

      if (error) throw error
      setUser(data)
      setSelectedRole(data.user_roles?.[0]?.role || "user")
    } catch (error) {
      console.error("Error loading user:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async () => {
    if (!user) return

    setUpdating(true)
    try {
      // First, remove existing role
      await supabase.from("user_roles").delete().eq("user_id", user.id)

      // Then add new role if not 'user'
      if (selectedRole !== "user") {
        const { error } = await supabase.from("user_roles").insert({
          user_id: user.id,
          role: selectedRole,
        })

        if (error) throw error
      }

      router.push("/admin/users")
    } catch (error) {
      console.error("Error updating user role:", error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>User not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Manage User</h1>
            <Button variant="outline" onClick={() => router.push("/admin/users")}>
              Back to Users
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Display Name</label>
                  <p className="text-gray-900">{user.display_name || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <p className="text-gray-900">{user.bio || "No bio"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Member Since</label>
                  <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Current Role</label>
                  <div className="mt-1">
                    <Badge variant={user.user_roles?.[0]?.role === "admin" ? "default" : "secondary"}>
                      {user.user_roles?.[0]?.role || "user"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Assign Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Role Descriptions:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>User:</strong> Basic access, can comment and like posts
                    </p>
                    <p>
                      <strong>Author:</strong> Can create and manage their own posts
                    </p>
                    <p>
                      <strong>Moderator:</strong> Can moderate comments and posts
                    </p>
                    <p>
                      <strong>Admin:</strong> Full access to all features
                    </p>
                  </div>
                </div>

                <Button onClick={updateUserRole} disabled={updating} className="w-full">
                  {updating ? "Updating..." : "Update Role"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
