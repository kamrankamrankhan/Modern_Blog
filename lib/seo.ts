import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  category?: string
}

export function generateSEO({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  category,
}: SEOProps): Metadata {
  const baseUrl = "https://metablog.vercel.app"
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/og-default.png`

  return {
    title,
    description,
    keywords: tags,
    authors: authors?.map((author) => ({ name: author })),
    category,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: type as any,
      locale: "en_US",
      url: fullUrl,
      title,
      description,
      siteName: "MetaBlog",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@metablog",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  category,
  tags,
}: {
  title: string
  description: string
  image?: string
  url: string
  publishedTime: string
  modifiedTime?: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  tags?: string[]
}) {
  const baseUrl = "https://metablog.vercel.app"

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? `${baseUrl}${image}` : undefined,
    url: `${baseUrl}${url}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author.name,
      image: author.avatar ? `${baseUrl}${author.avatar}` : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "MetaBlog",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${url}`,
    },
    articleSection: category,
    keywords: tags?.join(", "),
  }
}
