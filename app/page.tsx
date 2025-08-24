import { Header } from "@/components/header"
import { LandingHero } from "@/components/landing-hero"
import { BlogShowcase } from "@/components/blog-showcase"
import { LandingFeatures } from "@/components/landing-features"

import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <LandingHero />
      <BlogShowcase />
      <LandingFeatures />
      <Footer />
    </div>
  )
}
