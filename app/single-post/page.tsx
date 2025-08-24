import { getBlogPost } from "@/lib/blog-data"
import { redirect } from "next/navigation"

export default async function SinglePostPage() {
  // Redirect to the first blog post as an example
  const firstPost = await getBlogPost("impact-of-technology-on-workplace")

  if (firstPost) {
    redirect(`/blog/${firstPost.slug}`)
  }

  // Fallback redirect to blog page
  redirect("/blog")
}
