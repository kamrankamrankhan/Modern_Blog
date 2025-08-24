"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface LikeButtonProps {
  postId: string
  initialLikes: number
  initialIsLiked: boolean
}

export function LikeButton({ postId, initialLikes, initialIsLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLike = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        // Redirect to login or show login modal
        window.location.href = "/auth/login"
        return
      }

      if (isLiked) {
        // Unlike
        const { error } = await supabase.from("likes").delete().eq("post_id", postId).eq("user_id", user.id)

        if (!error) {
          setLikes(likes - 1)
          setIsLiked(false)
        }
      } else {
        // Like
        const { error } = await supabase.from("likes").insert({
          post_id: postId,
          user_id: user.id,
        })

        if (!error) {
          setLikes(likes + 1)
          setIsLiked(true)
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
      {likes}
    </Button>
  )
}
