import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-12 sm:py-16 lg:py-20 xl:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Welcome Badge */}
          <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium">
            🚀 Welcome to CoreEliteExperts.blogs
          </Badge>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Discover, Learn, and{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Grow
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
            Your premier destination for cutting-edge insights across technology, business, lifestyle, and beyond. 
            Join thousands of readers who trust CoreEliteExperts.blogs for quality content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            
            <Link href="/blog">
              <Button variant="outline" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold">
                <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Explore Articles
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto pt-4 sm:pt-6">
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">10K+</div>
              <div className="text-xs sm:text-sm text-gray-600">Active Readers</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Expert Authors</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-xs sm:text-sm text-gray-600">Content Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
