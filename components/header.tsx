"use client"

import { Search, Menu, X, User, LogOut, ChevronDown, BookOpen, Code, Briefcase, Heart, Plane, TrendingUp, Gamepad2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  const blogCategories = [
    {
      name: "Technology",
      description: "AI, Programming, Tech News",
      icon: Code,
      href: "/category/technology"
    },
    {
      name: "Business",
      description: "Startups, Marketing, Finance",
      icon: Briefcase,
      href: "/category/business"
    },
    {
      name: "Lifestyle",
      description: "Health, Wellness, Personal Growth",
      icon: Heart,
      href: "/category/lifestyle"
    },
    {
      name: "Travel",
      description: "Destinations, Tips, Adventures",
      icon: Plane,
      href: "/category/travel"
    },
    {
      name: "Economy",
      description: "Markets, Investments, Analysis",
      icon: TrendingUp,
      href: "/category/economy"
    },
    {
      name: "Sports",
      description: "Athletics, Training, Performance",
      icon: Gamepad2,
      href: "/category/sports"
    }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Brand - Top Left Corner */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">CEE</span>
              </div>
              <span className="text-gray-900 font-bold text-lg">CoreEliteExperts.blogs</span>
            </Link>
          </div>

          {/* Center Navigation - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            
            {/* Blog Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onMouseEnter={() => setActiveDropdown("blog")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span>Blog</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              {activeDropdown === "blog" && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
                  onMouseEnter={() => setActiveDropdown("blog")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {blogCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="group p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                            <category.icon className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500">{category.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* View All Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href="/blog"
                      className="flex items-center justify-center w-full py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      View All Articles
                      <BookOpen className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              About
            </Link>
            
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Side - Search and Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search Bar - Hidden on Small Mobile */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-32 sm:w-40 lg:w-48 xl:w-64 text-xs sm:text-sm"
              />
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
            </div>

            {/* Search Icon - Mobile Only */}
            <button className="sm:hidden p-1.5 sm:p-2">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </button>

            {/* Auth buttons */}
            {!loading && (
              <div className="hidden sm:flex items-center space-x-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-orange-600 hover:text-orange-700 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-orange-50 text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-600 hover:text-gray-700 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-orange-600 hover:text-orange-700 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-orange-50 text-sm font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-1.5 sm:p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            {/* Mobile Navigation */}
            <nav className="space-y-3 mb-6">
              <Link href="/" className="block text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Home
              </Link>
              
              {/* Mobile Blog Categories */}
              <div className="space-y-2">
                <div className="text-gray-700 font-medium py-2">Blog Categories</div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {blogCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <category.icon className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-600">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link href="/about" className="block text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                About
              </Link>
              
              <Link href="/contact" className="block text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                Contact
              </Link>
            </nav>

            {/* Mobile Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            {/* Mobile Auth */}
            {!loading && (
              <div className="space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block w-full text-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full text-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
