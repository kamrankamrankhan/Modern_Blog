"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateReadingTime } from "@/lib/utils"
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react"
import Link from "next/link"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [tags, setTags] = useState("")
  const [status, setStatus] = useState("draft")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false)

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Business",
    "Economy",
    "Sports",
    "Health",
    "Education",
    "Entertainment",
    "Science"
  ]

  useEffect(() => {
    loadPost()
  }, [params.id])

  const loadPost = async () => {
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Get the post
      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .eq("author_id", user.id)
        .single()

      if (error || !post) {
        setError("Post not found or you don't have permission to edit it")
        return
      }

      // Populate form fields
      setTitle(post.title || "")
      setSlug(post.slug || "")
      setExcerpt(post.excerpt || "")
      setContent(post.content || "")
      setCategory(post.category || "")
      setFeaturedImage(post.featured_image || "")
      setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "")
      setStatus(post.status || "draft")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoadingPost(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if slug is unique (excluding current post)
      let finalSlug = slug || generateSlug(title)
      let counter = 1
      let originalSlug = finalSlug
      
      setIsGeneratingSlug(true)
      while (true) {
        const { data: existingPost } = await supabase
          .from("posts")
          .select("id")
          .eq("slug", finalSlug)
          .neq("id", params.id)
          .single()
        
        if (!existingPost) break
        finalSlug = `${originalSlug}-${counter}`
        counter++
      }
      setIsGeneratingSlug(false)

      // Update the post
      const { error: postError } = await supabase
        .from("posts")
        .update({
          title,
          slug: finalSlug,
          excerpt,
          content,
          category,
          featured_image: featuredImage,
          tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
          status,
          reading_time: calculateReadingTime(content),
          updated_at: new Date().toISOString()
        })
        .eq("id", params.id)
        .eq("author_id", user.id)

      if (postError) throw postError

      // Show success message and redirect
      setError(null)
      alert("Post updated successfully!")
      router.push("/dashboard/my-posts")
    } catch (error: any) {
      console.error("Error updating post:", error)
      setError(error.message || "Failed to update post. Please try again.")
    } finally {
      setIsLoading(false)
      setIsGeneratingSlug(false)
    }
  }

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/dashboard/my-posts"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Posts
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-gray-600 mt-2">Update your blog post</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                  disabled={isGeneratingSlug}
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  required
                  disabled={isGeneratingSlug}
                />
                {isGeneratingSlug && (
                  <p className="text-sm text-blue-600 mt-1">Generating unique slug...</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of your post"
                rows={3}
                disabled={isGeneratingSlug}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={12}
                required
                disabled={isGeneratingSlug}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} disabled={isGeneratingSlug}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={isGeneratingSlug}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus} disabled={isGeneratingSlug}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tag1, tag2, tag3"
                disabled={isGeneratingSlug}
              />
              <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button
                type="submit"
                disabled={isLoading || isGeneratingSlug}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Post
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/blog/${slug}`)}
                disabled={!slug || isGeneratingSlug}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
