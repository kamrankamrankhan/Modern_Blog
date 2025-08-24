import Image from "next/image"
import { Target, Eye, Heart } from "lucide-react"
import { Header } from "@/components/header"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide insightful, well-researched content that informs and inspires our readers to stay ahead in the rapidly evolving world of technology.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become the leading platform for technology insights, fostering a community of curious minds and innovative thinkers.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "We believe in authenticity, quality, and the power of knowledge sharing to create positive change in the world.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">About MetaBlog</h1>
          <p className="text-gray-600">Discover our story, mission, and the people behind the content</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
            <Image src="/modern-office-women-tech.png" alt="MetaBlog team working" fill className="object-cover" />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed">
              MetaBlog was founded with a simple yet powerful vision: to bridge the gap between complex technological
              developments and everyday understanding. We believe that everyone deserves access to clear, insightful
              content about the technologies shaping our world.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Drives Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              Founded in 2020, MetaBlog emerged from a group of technology enthusiasts who noticed a gap in accessible
              tech journalism. While there was plenty of technical documentation and surface-level news, there was a
              lack of thoughtful, in-depth analysis that could help readers truly understand the implications of
              technological change.
            </p>
            <p className="text-gray-700 mb-4">
              Our team of writers, researchers, and industry experts work tirelessly to break down complex topics into
              engaging, understandable content. From artificial intelligence and blockchain to sustainable technology
              and digital transformation, we cover the stories that matter most.
            </p>
            <p className="text-gray-700">
              Today, MetaBlog serves thousands of readers worldwide, from curious beginners to seasoned professionals,
              all united by a shared passion for understanding how technology shapes our present and future.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Jason Francisco", role: "Editor-in-Chief", avatar: "/jason-francisco-headshot.png" },
              { name: "Tracy Wilson", role: "Senior Writer", avatar: "/tracy-wilson-headshot.png" },
              { name: "Elizabeth Slavin", role: "Technology Analyst", avatar: "/elizabeth-slavin-headshot.png" },
              { name: "Ernie Smith", role: "Research Director", avatar: "/ernie-smith-headshot.png" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <Image
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
