const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://qfmtwomncmaucdczpwqd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbXR3b21uY21hdWNkY3pwd3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzEyMjUsImV4cCI6MjA3MTMwNzIyNX0.yh41ZbXgfHl9z3LtXSBdhB1NamdiIX8RpyRmo_JYxZc'

const supabase = createClient(supabaseUrl, supabaseKey)

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

async function testSlugUniqueness() {
  console.log('Testing slug uniqueness logic...')

  try {
    // Test 1: Check if a slug exists
    const testSlug = 'test-post'
    console.log(`\n1. Checking if slug "${testSlug}" exists...`)
    
    const { data: existingPost, error } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", testSlug)
      .single()

    if (error && error.code === 'PGRST116') {
      console.log(`✅ Slug "${testSlug}" does not exist (unique)`)
    } else if (existingPost) {
      console.log(`❌ Slug "${testSlug}" already exists`)
    } else {
      console.log(`✅ Slug "${testSlug}" does not exist (unique)`)
    }

    // Test 2: Generate unique slug logic
    console.log('\n2. Testing unique slug generation...')
    const baseSlug = 'my-blog-post'
    let finalSlug = baseSlug
    let counter = 1
    let originalSlug = finalSlug
    
    while (true) {
      const { data: existingPost } = await supabase
        .from("posts")
        .select("id")
        .eq("slug", finalSlug)
        .single()

      if (!existingPost) {
        break // Slug is unique
      }

      console.log(`   Slug "${finalSlug}" exists, trying "${originalSlug}-${counter}"`)
      finalSlug = `${originalSlug}-${counter}`
      counter++
    }
    
    console.log(`✅ Final unique slug: "${finalSlug}"`)

    // Test 3: Check current posts in database
    console.log('\n3. Current posts in database:')
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("title, slug")
      .order("created_at", { ascending: false })
      .limit(5)

    if (postsError) {
      console.log(`❌ Error fetching posts: ${postsError.message}`)
    } else if (posts && posts.length > 0) {
      posts.forEach((post, index) => {
        console.log(`   ${index + 1}. "${post.title}" -> /${post.slug}`)
      })
    } else {
      console.log('   No posts found in database')
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testSlugUniqueness()
