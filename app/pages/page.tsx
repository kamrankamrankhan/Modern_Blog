import Link from "next/link"
import { FileText, Users, Info, Mail } from "lucide-react"
import { Header } from "@/components/header"

export default function PagesPage() {
  const pages = [
    {
      title: "About Us",
      description: "Learn more about our mission, vision, and the team behind MetaBlog.",
      icon: Info,
      href: "/about",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Our Team",
      description: "Meet the talented writers and contributors who make MetaBlog possible.",
      icon: Users,
      href: "/team",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Privacy Policy",
      description: "Understand how we collect, use, and protect your personal information.",
      icon: FileText,
      href: "/privacy",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Terms of Service",
      description: "Read our terms and conditions for using the MetaBlog platform.",
      icon: FileText,
      href: "/terms",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Contact",
      description: "Get in touch with us for questions, feedback, or collaboration opportunities.",
      icon: Mail,
      href: "/contact",
      color: "bg-red-100 text-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pages</h1>
          <p className="text-gray-600">Explore all the pages and resources available on MetaBlog</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page) => {
            const IconComponent = page.icon
            return (
              <Link key={page.href} href={page.href} className="group">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group-hover:border-blue-300">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${page.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-gray-600">{page.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Our support team is here to help you navigate through our content and
            find exactly what you need.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
