"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { calculateReadingTime } from "@/lib/utils"

export default function NewPostPage() {
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
  const [error, setError] = useState<string | null>(null)
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false)

  const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Business",
    "Economy",
    "Sports"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Generate slug if not provided
      let finalSlug = slug || generateSlug(title)

      // Check if slug already exists and generate a unique one
      let counter = 1
      let originalSlug = finalSlug
      
      setIsGeneratingSlug(true)
      
      while (true) {
        const { data: existingPost } = await supabase
          .from("posts")
          .select("id")
          .eq("slug", finalSlug)
          .single()

        if (!existingPost) {
          break // Slug is unique
        }

        // Generate new slug with counter
        finalSlug = `${originalSlug}-${counter}`
        counter++
      }
      
      setIsGeneratingSlug(false)

      // Create the post
      const { error: postError } = await supabase.from("posts").insert({
        title,
        slug: finalSlug,
        excerpt,
        content,
        category,
        featured_image: featuredImage,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        status,
        author_id: user.id,
        published_at: status === "published" ? new Date().toISOString() : null,
        view_count: 0,
        reading_time: calculateReadingTime(content)
      })

      if (postError) throw postError

      // Show success message and redirect to dashboard
      setError(null)
      alert("Post created successfully!")
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error creating post:", error)
      setError(error.message || "Failed to create post. Please try again.")
    } finally {
      setIsLoading(false)
      setIsGeneratingSlug(false)
    }
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-gray-600 mt-2">Write and publish your next blog post</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                          if (!slug) {
                            setSlug(generateSlug(e.target.value))
                          }
                        }}
                        placeholder="Enter your post title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="post-url-slug"
                        disabled={isGeneratingSlug}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {isGeneratingSlug ? "Generating unique slug..." : "Leave empty to auto-generate from title"}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Brief description of your post"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here..."
                        rows={15}
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Estimated reading time: {Math.ceil(content.split(" ").length / 200)} min
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
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
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="tag1, tag2, tag3"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Separate tags with commas
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        disabled={isLoading || isGeneratingSlug}
                        className="flex-1"
                      >
                        {isGeneratingSlug ? (
                          "Generating Slug..."
                        ) : isLoading ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            {status === "published" ? "Publish" : "Save Draft"}
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStatus("published")}
                        disabled={isLoading || isGeneratingSlug}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
