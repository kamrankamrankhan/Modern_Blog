import { Zap, Shield, BarChart3, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process data and generate insights in real-time with our optimized infrastructure.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance certifications.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "AI-powered analytics that turn your data into actionable business insights.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Seamless collaboration tools that keep your team aligned and productive.",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-[#f6f6f7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#141624]">Everything you need to succeed</h2>
          <p className="text-xl text-[#52525b] max-w-3xl mx-auto">
            Powerful features designed to streamline your operations and accelerate growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#ffffff] p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#4b6bfb] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-[#4b6bfb]" />
              </div>
              <h3 className="text-xl font-semibold text-[#141624] mb-3">{feature.title}</h3>
              <p className="text-[#52525b] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
