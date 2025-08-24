import { Header } from "@/components/header"

export default function ArchivedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Archived Posts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of archived articles and past publications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Archived posts would be loaded here */}
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2023 Archives</h3>
            <p className="text-gray-600 mb-4">View all posts from 2023</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Browse →</button>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2022 Archives</h3>
            <p className="text-gray-600 mb-4">View all posts from 2022</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Browse →</button>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2021 Archives</h3>
            <p className="text-gray-600 mb-4">View all posts from 2021</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Browse →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
