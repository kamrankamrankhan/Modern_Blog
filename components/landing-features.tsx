import { Code, Users, TrendingUp, Shield, Zap, BookOpen, Globe, Target } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Cutting-Edge Technology",
    description: "Stay ahead with the latest insights in AI, programming, and emerging technologies.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with industry leaders, thought leaders, and passionate professionals.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: TrendingUp,
    title: "Trending Insights",
    description: "Discover what's hot and what's next in business, economy, and markets.",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Shield,
    title: "Quality Content",
    description: "Curated, fact-checked articles written by verified experts and professionals.",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with instant loading and seamless navigation.",
    color: "from-yellow-500 to-orange-600"
  },
  {
    icon: BookOpen,
    title: "Diverse Topics",
    description: "From lifestyle and travel to sports and entertainment - we cover it all.",
    color: "from-amber-500 to-yellow-600"
  }
]

export function LandingFeatures() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              CoreEliteExperts.blogs
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 leading-relaxed">
            We're committed to delivering exceptional value through quality content, expert insights, and innovative features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
