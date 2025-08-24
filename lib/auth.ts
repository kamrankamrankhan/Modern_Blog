import { createClient } from "@/lib/supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserRole(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).single()
  return data?.role || "user"
}

export async function isAdmin(userId: string) {
  const role = await getUserRole(userId)
  return role === "admin"
}

export async function isModerator(userId: string) {
  const role = await getUserRole(userId)
  return role === "admin" || role === "moderator"
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  const isUserAdmin = await isAdmin(user.id)
  if (!isUserAdmin) {
    throw new Error("Admin access required")
  }
  return user
}
