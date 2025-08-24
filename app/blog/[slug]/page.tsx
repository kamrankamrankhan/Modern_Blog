import { getPostBySlug, getLatestPosts } from "@/lib/blog-data"
import { createClient } from "@/lib/supabase/server"
import { generateSEO, generateArticleStructuredData } from "@/lib/seo"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LikeButton } from "@/components/engagement/like-button"
import { BookmarkButton } from "@/components/engagement/bookmark-button"
import { CommentsSection } from "@/components/engagement/comments-section"
import { Share2, Eye } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return generateSEO({
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    })
  }

  return generateSEO({
    title: post.title,
    description: post.excerpt || `Read ${post.title} by ${post.author} on CoreEliteExperts.blogs`,
    image: post.featuredImage,
    url: `/blog/${post.slug}`,
    type: "article",
    publishedTime: new Date(post.publishedAt).toISOString(),
    authors: [post.author],
    tags: post.tags,
    category: post.category,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Get all posts for navigation
  const allPosts = await getLatestPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === resolvedParams.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const supabase = await createClient()

  // Get engagement data
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let likesCount = 0
  let isLiked = false
  let isBookmarked = false

  // Get likes count
  const { count: totalLikes } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", post.id)

  likesCount = totalLikes || 0

  if (user) {
    // Check if user liked this post
    const { data: userLike } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", post.id)
      .eq("user_id", user.id)
      .single()

    isLiked = !!userLike

    // Check if user bookmarked this post
    const { data: userBookmark } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("post_id", post.id)
      .eq("user_id", user.id)
      .single()

    isBookmarked = !!userBookmark
  }

  // Increment view count
  await supabase
    .from("posts")
    .update({ view_count: post.view_count + 1 })
    .eq("id", post.id)

  const structuredData = generateArticleStructuredData({
    title: post.title,
    description: post.excerpt || post.title,
    image: post.featuredImage,
    url: `/blog/${post.slug}`,
    publishedTime: new Date(post.publishedAt).toISOString(),
    author: post.author,
    category: post.category,
    tags: post.tags,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="min-h-screen bg-white">
        {/* Breadcrumb with Back Button */}
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-gray-900">{post.title}</span>
              </nav>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-between text-gray-600 mb-8">
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder.svg"
                  alt={post.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm">
                    {post.publishedAt} • {post.readTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>1 view</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-96 md:h-[500px] mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="flex items-center justify-between py-6 border-y border-gray-200 mb-12">
            <div className="flex items-center space-x-4">
              <LikeButton postId={post.id} initialLikes={likesCount} initialIsLiked={isLiked} />
              <BookmarkButton postId={post.id} initialIsBookmarked={isBookmarked} />
            </div>
            <div className="flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Share</span>
            </div>
          </div>

          <CommentsSection postId={post.id} />

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                ← Back to Blog
              </Link>
              
              <div className="flex items-center space-x-4">
                {prevPost && (
                  <Link 
                    href={`/blog/${prevPost.slug}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    ← Previous Post
                  </Link>
                )}
                {nextPost && (
                  <Link 
                    href={`/blog/${nextPost.slug}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Next Post →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Back Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title="Back to Blog"
          >
            ←
          </Link>
        </div>
      </div>
    </>
  )
}
