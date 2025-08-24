import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <Link href="/blog/impact-of-technology-on-workplace" className="block">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
          <img
            src="/modern-office-women-tech.png"
            alt="The Impact of Technology on the Workplace"
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 text-white max-w-full sm:max-w-2xl">
            <Badge className="bg-blue-600 text-white mb-2 sm:mb-4 text-xs sm:text-sm">Technology</Badge>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
              The Impact of Technology on the Workplace: How Technology is Changing
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <img
                  src="/jason-francisco-headshot.png"
                  alt="Jason Francisco"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
                <span>Jason Francisco</span>
              </div>
              <span className="text-gray-200">August 20, 2024</span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
