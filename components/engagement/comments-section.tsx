"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Comment {
  id: string
  content: string
  created_at: string
  author: {
    name: string
    avatar: string | null
  }
}

interface CommentsSectionProps {
  postId: string
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    setLoading(true)
    try {
      // First check if the comments table exists and is accessible
      const { data: tableCheck, error: tableError } = await supabase
        .from("comments")
        .select("id")
        .limit(1)

      if (tableError) {
        // Table doesn't exist or no permission
        console.log("Comments table not accessible:", tableError.message)
        setComments([])
        return
      }

      // Now try to get actual comments
      const { data, error } = await supabase
        .from("comments")
        .select(`
          id,
          content,
          created_at,
          author_id
        `)
        .eq("post_id", postId)
        .is("parent_id", null)
        .order("created_at", { ascending: false })

      if (error) {
        console.log("Error fetching comments:", error.message)
        setComments([])
        return
      }

      const formattedComments = data.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        author: {
          name: "Anonymous", // Since profiles table is empty, use default
          avatar: null,
        },
      }))

      setComments(formattedComments)
    } catch (error: any) {
      console.log("Unexpected error loading comments:", error.message || error)
      setComments([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/auth/login"
        return
      }

      const { error } = await supabase.from("comments").insert({
        post_id: postId,
        author_id: user.id,
        content: newComment.trim(),
      })

      if (error) {
        // If the table doesn't exist, show a message
        if (error.code === '42P01') { // Table doesn't exist
          alert("Comments feature is not available yet. Please try again later.")
          return
        }
        throw error
      }

      setNewComment("")
      loadComments() // Reload comments
    } catch (error) {
      console.error("Error submitting comment:", error)
      alert("Failed to post comment. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={submitting || !newComment.trim()}>
                {submitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No comments yet. Be the first to share your thoughts!</div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={comment.author.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
