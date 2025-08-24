import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-lg">
              About
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              CoreEliteExperts.blogs is your premier destination for cutting-edge insights across technology, business, lifestyle, and beyond. 
              We're committed to delivering quality content that inspires, educates, and empowers our readers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> info@coreeliteexperts.blogs
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/archived" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Archived
                </Link>
              </li>
              <li>
                <Link href="/author" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Author
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-lg">
              Categories
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/category/lifestyle" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/travel" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/category/economy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Economy
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-lg">
              Weekly Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-3 sm:mb-4">
              Get blog articles and offers via email
            </p>
            <div className="space-y-2 sm:space-y-3">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CEE</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">CoreEliteExperts.blogs</span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">
                Terms of Use
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs sm:text-sm">© CoreEliteExperts.blogs 2024. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
