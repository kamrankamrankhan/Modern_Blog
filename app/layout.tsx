import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "CoreEliteExperts.blogs - Discover, Learn, and Grow",
    template: "%s | CoreEliteExperts.blogs",
  },
  description:
    "Your premier destination for cutting-edge insights across technology, business, lifestyle, and beyond. Join thousands of readers who trust CoreEliteExperts.blogs for quality content.",
  keywords: ["CoreEliteExperts.blogs", "CEE", "blog", "technology", "business", "lifestyle", "travel", "economy", "sports", "insights", "learning", "growth"],
  authors: [{ name: "CoreEliteExperts.blogs Team" }],
  creator: "CoreEliteExperts.blogs",
  publisher: "CoreEliteExperts.blogs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://coreeliteexperts.blogs"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coreeliteexperts.blogs",
    title: "CoreEliteExperts.blogs - Discover, Learn, and Grow",
    description:
      "Your premier destination for cutting-edge insights across technology, business, lifestyle, and beyond. Join thousands of readers who trust CoreEliteExperts.blogs for quality content.",
    siteName: "CoreEliteExperts.blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreEliteExperts.blogs - Discover, Learn, and Grow",
    description:
      "Your premier destination for cutting-edge insights across technology, business, lifestyle, and beyond. Join thousands of readers who trust CoreEliteExperts.blogs for quality content.",
    creator: "@coreeliteexperts",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CoreEliteExperts.blogs",
              url: "https://coreeliteexperts.blogs",
              logo: "https://coreeliteexperts.blogs/logo.png",
              description: "Your premier destination for cutting-edge insights across technology, business, lifestyle, and beyond.",
              sameAs: [
                "https://twitter.com/coreeliteexperts",
                "https://facebook.com/coreeliteexperts",
                "https://linkedin.com/company/coreeliteexperts",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
