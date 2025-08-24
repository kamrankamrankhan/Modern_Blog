import { createClient } from './supabase/server'

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorSlug: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  tags: string[];
}

// Fallback hardcoded data in case database is not available
const fallbackBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in 2024",
    slug: "future-ai-2024",
    excerpt: "Explore AI breakthroughs and trends that will shape the future of technology and business.",
    content: "AI continues to evolve at an unprecedented pace, transforming industries and creating new opportunities.",
    author: "Dr. Sarah Chen",
    authorSlug: "sarah-chen",
    category: "Technology",
    categorySlug: "technology",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    tags: ["AI", "Technology", "Machine Learning", "Innovation"]
  },
  {
    id: "2",
    title: "The Impact of Technology on the Workplace",
    slug: "impact-of-technology-on-workplace",
    excerpt: "Explore how technology is reshaping modern workplaces, from remote work tools to AI-powered productivity solutions.",
    content: "Technology has fundamentally transformed the way we work, communicate, and collaborate in modern workplaces. From remote work tools to AI-powered productivity solutions, the digital revolution continues to reshape our professional lives.",
    author: "CEE",
    authorSlug: "cee",
    category: "Technology",
    categorySlug: "technology",
    publishedAt: "2024-01-10",
    readTime: "8 min read",
    featuredImage: "/modern-office-women-tech.png",
    tags: ["workplace", "technology", "remote-work", "AI", "productivity"]
  },
  {
    id: "3",
    title: "Sustainable Living: A Guide to Eco-Friendly Home Practices",
    slug: "sustainable-living-eco-friendly-home",
    excerpt: "Discover practical ways to make your home more eco-friendly and reduce your environmental impact.",
    content: "Creating an eco-friendly home is not just about saving money—it's about protecting our planet for future generations. Sustainable living practices can significantly reduce your environmental impact while improving your quality of life.",
    author: "CEE",
    authorSlug: "cee",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    publishedAt: "2024-01-08",
    readTime: "6 min read",
    featuredImage: "/rustic-sustainable-house.png",
    tags: ["sustainability", "eco-friendly", "home", "green-living", "environment"]
  },
  {
    id: "4",
    title: "Digital Marketing Trends That Will Dominate 2024",
    slug: "digital-marketing-trends-2024",
    excerpt: "Stay ahead of the curve with these key digital marketing trends that will shape the industry in 2024.",
    content: "The digital marketing landscape is constantly evolving, and 2024 brings new challenges and opportunities for businesses looking to connect with their audiences effectively.",
    author: "CEE",
    authorSlug: "cee",
    category: "Business",
    categorySlug: "business",
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    featuredImage: "/modern-analytics-dashboard.png",
    tags: ["digital-marketing", "trends", "AI", "video-content", "social-commerce"]
  },
  {
    id: "5",
    title: "The Future of Electric Vehicles: What to Expect in the Next Decade",
    slug: "future-of-electric-vehicles-next-decade",
    excerpt: "Explore the exciting developments in electric vehicle technology and what the future holds for sustainable transportation.",
    content: "Electric vehicles are rapidly becoming the future of transportation, with major automakers investing billions in EV development and governments implementing policies to accelerate adoption.",
    author: "CEE",
    authorSlug: "cee",
    category: "Technology",
    categorySlug: "technology",
    publishedAt: "2024-01-03",
    readTime: "5 min read",
    featuredImage: "/vintage-orange-sports-car.png",
    tags: ["electric-vehicles", "battery-technology", "autonomous-driving", "sustainability", "transportation"]
  },
  {
    id: "6",
    title: "Mindful Travel: How to Experience Destinations More Deeply",
    slug: "mindful-travel-experience-destinations-deeply",
    excerpt: "Discover how to travel more mindfully and create deeper, more meaningful travel experiences.",
    content: "Travel is not just about seeing new places—it's about experiencing them with intention and mindfulness. Mindful travel allows you to connect more deeply with destinations, cultures, and yourself.",
    author: "CEE",
    authorSlug: "cee",
    category: "Travel",
    categorySlug: "travel",
    publishedAt: "2024-01-01",
    readTime: "4 min read",
    featuredImage: "/tropical-island-paradise.png",
    tags: ["mindful-travel", "cultural-immersion", "slow-travel", "personal-growth", "experiential-travel"]
  }
];

// Test database connection
export async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...')
    const supabase = await createClient()
    
    // Try to query the posts table
    const { data, error } = await supabase
      .from('posts')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Database connection test failed:', error)
      return false
    }
    
    console.log('Database connection successful!')
    return true
  } catch (error) {
    console.error('Database connection test error:', error)
    return false
  }
}

export async function getLatestPosts(limit: number = 6): Promise<BlogPost[]> {
  try {
    console.log('Attempting to fetch posts from database...')
    const supabase = await createClient()
    
    // First, try to fetch posts without the complex join
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        reading_time,
        published_at,
        author_id
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching posts from database:', error)
      console.log('Falling back to hardcoded data...')
      return fallbackBlogPosts.slice(0, limit)
    }

    if (!posts || posts.length === 0) {
      console.log('No posts found in database, using fallback data')
      return fallbackBlogPosts.slice(0, limit)
    }

    console.log(`Successfully fetched ${posts.length} posts from database`)
    
    // Transform database posts to match our BlogPost interface
    const transformedPosts: BlogPost[] = await Promise.all(posts.map(async (post) => {
      // Get author information from profiles table
      let authorName = 'candi' // Default to candi
      let authorSlug = 'candi'
      
      if (post.author_id) {
        try {
          // Try to get user info from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', post.author_id)
            .single()
          
          if (!profileError && profileData && profileData.display_name) {
            authorName = profileData.display_name
            authorSlug = profileData.display_name.toLowerCase().replace(/\s+/g, '-')
          } else {
            // If no profile, try to get from auth.users (this might not work from client)
            // For now, we'll use the default author name
            console.log(`No profile found for user ${post.author_id}, using default author name`)
          }
        } catch (profileError) {
          console.error('Error fetching profile info:', profileError)
          // Keep default author name
        }
      }
      
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || post.title,
        content: post.content,
        author: authorName,
        authorSlug: authorSlug,
        category: post.category,
        categorySlug: post.category.toLowerCase().replace(/\s+/g, '-'),
        publishedAt: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        readTime: post.reading_time ? `${post.reading_time} min read` : '5 min read',
        featuredImage: post.featured_image || '/placeholder.svg',
        tags: post.tags || []
      }
    }))

    return transformedPosts
  } catch (error) {
    console.error('Error in getLatestPosts:', error)
    console.log('Falling back to hardcoded data due to error...')
    return fallbackBlogPosts.slice(0, limit)
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const supabase = await createClient()
    
    // Fetch posts by category from database
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        reading_time,
        published_at,
        author_id
      `)
      .eq('status', 'published')
      .eq('category', category)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts by category from database:', error)
      return fallbackBlogPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (!posts || posts.length === 0) {
      console.log(`No posts found for category '${category}' in database, using fallback data`)
      return fallbackBlogPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Transform database posts to match our BlogPost interface
    const transformedPosts: BlogPost[] = await Promise.all(posts.map(async (post) => {
      // Get author information from profiles table
      let authorName = 'candi' // Default to candi
      let authorSlug = 'candi'
      
      if (post.author_id) {
        try {
          // Try to get user info from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', post.author_id)
            .single()
          
          if (!profileError && profileData && profileData.display_name) {
            authorName = profileData.display_name
            authorSlug = profileData.display_name.toLowerCase().replace(/\s+/g, '-')
          } else {
            console.log(`No profile found for user ${post.author_id}, using default author name`)
          }
        } catch (profileError) {
          console.error('Error fetching profile info:', profileError)
          // Keep default author name
        }
      }
      
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || post.title,
        content: post.content,
        author: authorName,
        authorSlug: authorSlug,
        category: post.category,
        categorySlug: post.category.toLowerCase().replace(/\s+/g, '-'),
        publishedAt: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        readTime: post.reading_time ? `${post.reading_time} min read` : '5 min read',
        featuredImage: post.featured_image || '/placeholder.svg',
        tags: post.tags || []
      }
    }))

    return transformedPosts
  } catch (error) {
    console.error('Error in getPostsByCategory:', error)
    return fallbackBlogPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    )
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient()
    
    // Fetch post by slug from database
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        reading_time,
        published_at,
        author_id
      `)
      .eq('status', 'published')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching post by slug from database:', error)
      return fallbackBlogPosts.find(post => post.slug === slug) || null
    }

    if (!posts) {
      console.log(`Post with slug '${slug}' not found in database, using fallback data`)
      return fallbackBlogPosts.find(post => post.slug === slug) || null
    }

    // Transform database post to match our BlogPost interface
    let authorName = 'candi' // Default to candi
    let authorSlug = 'candi'
    
    if (posts.author_id) {
      try {
        // Try to get user info from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', posts.author_id)
          .single()
        
        if (!profileError && profileData && profileData.display_name) {
          authorName = profileData.display_name
          authorSlug = profileData.display_name.toLowerCase().replace(/\s+/g, '-')
        } else {
          console.log(`No profile found for user ${posts.author_id}, using default author name`)
        }
      } catch (profileError) {
        console.error('Error fetching profile info:', profileError)
        // Keep default author name
      }
    }
    
    const transformedPost: BlogPost = {
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt || posts.title,
      content: posts.content,
      author: authorName,
      authorSlug: authorSlug,
      category: posts.category,
      categorySlug: posts.category.toLowerCase().replace(/\s+/g, '-'),
      publishedAt: posts.published_at ? new Date(posts.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      readTime: posts.reading_time ? `${posts.reading_time} min read` : '5 min read',
      featuredImage: posts.featured_image || '/placeholder.svg',
      tags: posts.tags || []
    }

    return transformedPost
  } catch (error) {
    console.error('Error in getPostBySlug:', error)
    return fallbackBlogPosts.find(post => post.slug === slug) || null
  }
}

// Alias for backward compatibility
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return getPostBySlug(slug)
}

export async function getUserPosts(userId: string): Promise<BlogPost[]> {
  try {
    const supabase = await createClient()
    
    // Fetch posts by user ID from database
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        reading_time,
        published_at,
        author_id
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user posts from database:', error)
      return fallbackBlogPosts
    }

    if (!posts || posts.length === 0) {
      console.log(`No posts found for user '${userId}' in database`)
      return []
    }

    console.log(`Successfully fetched ${posts.length} posts for user '${userId}' from database`)
    
    // Transform database posts to match our BlogPost interface
    const transformedPosts: BlogPost[] = posts.map(post => {
      // For user posts, we can show the actual user information
      // Since this is the user's own posts, we can get their name from auth context
      // For now, we'll use a more personalized approach
      let authorName = 'candi' // Since this is getUserPosts, we know it's the current user
      let authorSlug = 'candi'
      
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || post.title,
        content: post.content,
        author: authorName,
        authorSlug: authorSlug,
        category: post.category,
        categorySlug: post.category.toLowerCase().replace(/\s+/g, '-'),
        publishedAt: post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        readTime: post.reading_time ? `${post.reading_time} min read` : '5 min read',
        featuredImage: post.featured_image || '/placeholder.svg',
        tags: post.tags || []
      }
    })

    return transformedPosts
  } catch (error) {
    console.error('Error in getUserPosts:', error)
    return fallbackBlogPosts
  }
}
