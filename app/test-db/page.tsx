import { testDatabaseConnection, getLatestPosts } from '@/lib/blog-data'

export default async function TestDBPage() {
  const dbConnected = await testDatabaseConnection()
  const posts = await getLatestPosts(5)
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Connection Test</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className={`p-4 rounded-lg ${dbConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {dbConnected ? '✅ Database Connected' : '❌ Database Connection Failed'}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Posts Fetched ({posts.length})</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">Author: {post.author}</p>
                <p className="text-sm text-gray-600">Category: {post.category}</p>
                <p className="text-sm text-gray-600">Source: {post.id.length > 10 ? 'Database' : 'Fallback Data'}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p><strong>Total Posts:</strong> {posts.length}</p>
            <p><strong>Database Connected:</strong> {dbConnected ? 'Yes' : 'No'}</p>
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
            <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set'}</p>
            <p><strong>Supabase Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
