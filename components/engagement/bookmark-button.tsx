"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

interface BookmarkButtonProps {
  postId: string
  initialIsBookmarked: boolean
}

export function BookmarkButton({ postId, initialIsBookmarked }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleBookmark = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase.from("bookmarks").delete().eq("post_id", postId).eq("user_id", user.id)

        if (!error) {
          setIsBookmarked(false)
        }
      } else {
        // Add bookmark
        const { error } = await supabase.from("bookmarks").insert({
          post_id: postId,
          user_id: user.id,
        })

        if (!error) {
          setIsBookmarked(true)
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size="sm"
      onClick={handleBookmark}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      {isBookmarked ? "Saved" : "Save"}
    </Button>
  )
}
