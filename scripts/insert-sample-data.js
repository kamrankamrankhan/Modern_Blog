const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertSampleData() {
  try {
    console.log('🔄 Starting to insert sample data...')

    // First, create a sample user profile
    console.log('📝 Creating sample user profile...')
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        display_name: 'MetaBlog Team',
        bio: 'The official MetaBlog team bringing you the latest insights and stories.',
        avatar_url: '/jason-francisco-headshot.png'
      })

    if (profileError) {
      console.error('❌ Error creating profile:', profileError)
    } else {
      console.log('✅ Profile created successfully')
    }

    // Sample blog posts data
    const samplePosts = [
      {
        id: '00000000-0000-0000-0000-000000000001',
        title: 'The Impact of Technology on the Workplace: How Technology is Changing Everything',
        slug: 'impact-of-technology-on-workplace',
        content: 'Technology has fundamentally transformed the way we work, communicate, and collaborate in modern workplaces. From remote work tools to AI-powered productivity solutions, the digital revolution continues to reshape our professional lives.\n\nIn this comprehensive guide, we explore the key technological trends that are driving workplace transformation, including cloud computing, artificial intelligence, automation, and digital collaboration platforms.\n\nThe COVID-19 pandemic accelerated the adoption of remote work technologies, making video conferencing, project management tools, and cloud-based systems essential for business continuity. Companies that embraced these technologies found themselves better positioned to adapt to changing circumstances.\n\nArtificial intelligence is another game-changer, automating routine tasks and providing insights that help employees make better decisions. From chatbots handling customer inquiries to AI-powered analytics tools, these technologies are freeing up human workers to focus on more creative and strategic tasks.\n\nThe future of work is undoubtedly digital, and organizations that invest in the right technologies while maintaining a human-centered approach will thrive in this new era.',
        excerpt: 'Explore how technology is reshaping modern workplaces, from remote work tools to AI-powered productivity solutions.',
        featured_image: '/modern-office-women-tech.png',
        author_id: '00000000-0000-0000-0000-000000000001',
        category: 'Technology',
        tags: ['workplace', 'technology', 'remote-work', 'AI', 'productivity'],
        status: 'published',
        featured: true,
        view_count: 1250,
        reading_time: 8,
        published_at: new Date().toISOString()
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        title: 'Sustainable Living: A Guide to Eco-Friendly Home Practices',
        slug: 'sustainable-living-eco-friendly-home',
        content: 'Creating an eco-friendly home is not just about saving money—it\'s about protecting our planet for future generations. Sustainable living practices can significantly reduce your environmental impact while improving your quality of life.\n\nStart with energy efficiency: switch to LED lighting, install programmable thermostats, and consider renewable energy sources like solar panels. These changes can reduce your carbon footprint and energy bills simultaneously.\n\nWater conservation is another crucial aspect. Install low-flow fixtures, collect rainwater for gardening, and fix leaks promptly. Small changes can add up to significant water savings over time.\n\nWhen it comes to materials and products, choose sustainable options. Look for furniture made from responsibly sourced wood, use natural cleaning products, and opt for reusable items instead of disposable ones.\n\nGardening and composting can turn your home into a mini ecosystem. Grow your own vegetables, compost kitchen waste, and create habitats for local wildlife. These practices not only benefit the environment but also provide fresh, organic food for your family.',
        excerpt: 'Discover practical ways to make your home more eco-friendly and reduce your environmental impact.',
        featured_image: '/rustic-sustainable-house.png',
        author_id: '00000000-0000-0000-0000-000000000001',
        category: 'Lifestyle',
        tags: ['sustainability', 'eco-friendly', 'home', 'green-living', 'environment'],
        status: 'published',
        featured: true,
        view_count: 890,
        reading_time: 6,
        published_at: new Date().toISOString()
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        title: 'Digital Marketing Trends That Will Dominate 2024',
        slug: 'digital-marketing-trends-2024',
        content: 'The digital marketing landscape is constantly evolving, and 2024 brings new challenges and opportunities for businesses looking to connect with their audiences effectively.\n\nVideo content continues to dominate, with short-form videos, live streaming, and interactive content leading the way. Platforms like TikTok, Instagram Reels, and YouTube Shorts are essential for reaching younger demographics.\n\nArtificial intelligence and machine learning are revolutionizing marketing automation, personalization, and customer insights. AI-powered tools can analyze customer behavior, predict trends, and deliver personalized experiences at scale.\n\nVoice search optimization is becoming increasingly important as more people use voice assistants. Optimizing your content for conversational queries and local search can significantly improve your visibility.\n\nPrivacy-first marketing is gaining traction as consumers become more concerned about data protection. First-party data collection, transparent privacy policies, and ethical marketing practices are now competitive advantages.\n\nThe rise of social commerce is transforming how people discover and purchase products. Integrating shopping features directly into social media platforms creates seamless customer journeys.',
        excerpt: 'Stay ahead of the curve with these key digital marketing trends that will shape the industry in 2024.',
        featured_image: '/modern-analytics-dashboard.png',
        author_id: '00000000-0000-0000-0000-000000000001',
        category: 'Business',
        tags: ['digital-marketing', 'trends', 'AI', 'video-content', 'social-commerce'],
        status: 'published',
        featured: false,
        view_count: 567,
        reading_time: 7,
        published_at: new Date().toISOString()
      },
      {
        id: '00000000-0000-0000-0000-000000000004',
        title: 'The Future of Electric Vehicles: What to Expect in the Next Decade',
        slug: 'future-of-electric-vehicles-next-decade',
        content: 'Electric vehicles are rapidly becoming the future of transportation, with major automakers investing billions in EV development and governments implementing policies to accelerate adoption.\n\nBattery technology is the key driver of EV advancement. Solid-state batteries, which offer higher energy density and faster charging, are expected to become commercially viable within the next five years. This breakthrough could eliminate range anxiety and make EVs more practical for long-distance travel.\n\nCharging infrastructure is expanding rapidly, with companies like Tesla, Electrify America, and ChargePoint building extensive networks. Wireless charging technology is also in development, which could make charging as simple as parking your car.\n\nAutonomous driving features are becoming standard in new EVs, with advanced driver assistance systems (ADAS) paving the way for fully self-driving vehicles. These technologies improve safety and convenience while making EVs more attractive to consumers.\n\nThe environmental benefits of EVs are significant, especially as electricity generation becomes cleaner. When powered by renewable energy, EVs can have a carbon footprint up to 70% smaller than traditional vehicles.',
        excerpt: 'Explore the exciting developments in electric vehicle technology and what the future holds for sustainable transportation.',
        featured_image: '/vintage-orange-sports-car.png',
        author_id: '00000000-0000-0000-0000-000000000001',
        category: 'Technology',
        tags: ['electric-vehicles', 'battery-technology', 'autonomous-driving', 'sustainability', 'transportation'],
        status: 'published',
        featured: false,
        view_count: 432,
        reading_time: 5,
        published_at: new Date().toISOString()
      },
      {
        id: '00000000-0000-0000-0000-000000000005',
        title: 'Mindful Travel: How to Experience Destinations More Deeply',
        slug: 'mindful-travel-experience-destinations-deeply',
        content: 'Travel is not just about seeing new places—it\'s about experiencing them with intention and mindfulness. Mindful travel allows you to connect more deeply with destinations, cultures, and yourself.\n\nStart by slowing down. Instead of trying to see everything, choose fewer destinations and spend more time in each place. This approach allows you to notice details, interact with locals, and develop a deeper understanding of the culture.\n\nPractice presence by engaging all your senses. Notice the sounds of street markets, the aromas of local cuisine, the textures of traditional crafts, and the colors of landscapes. These sensory experiences create lasting memories.\n\nLearn about the local culture before you visit. Understanding the history, customs, and language basics shows respect and opens doors to more meaningful interactions. Consider taking a cooking class, joining a local tour, or participating in cultural activities.\n\nDocument your journey mindfully. Instead of constantly taking photos, take time to reflect and write about your experiences. This practice helps you process what you\'ve learned and creates a personal record of your growth.',
        excerpt: 'Discover how to travel more mindfully and create deeper, more meaningful travel experiences.',
        featured_image: '/tropical-island-paradise.png',
        author_id: '00000000-0000-0000-0000-000000000001',
        category: 'Travel',
        tags: ['mindful-travel', 'cultural-immersion', 'slow-travel', 'personal-growth', 'experiential-travel'],
        status: 'published',
        featured: false,
        view_count: 298,
        reading_time: 4,
        published_at: new Date().toISOString()
      }
    ]

    console.log('📝 Inserting sample blog posts...')
    for (const post of samplePosts) {
      const { error: postError } = await supabase
        .from('posts')
        .upsert(post)

      if (postError) {
        console.error(`❌ Error inserting post "${post.title}":`, postError)
      } else {
        console.log(`✅ Post "${post.title}" inserted successfully`)
      }
    }

    console.log('🎉 Sample data insertion completed!')
    console.log('📊 You can now view your blog posts at http://localhost:3000')

  } catch (error) {
    console.error('❌ Error inserting sample data:', error)
  }
}

insertSampleData()

