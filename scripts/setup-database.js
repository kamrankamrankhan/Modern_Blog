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

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...')

    // Create profiles table
    console.log('📝 Creating profiles table...')
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          display_name text,
          bio text,
          avatar_url text,
          website text,
          location text,
          created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
        );
        
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
        CREATE POLICY IF NOT EXISTS "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
        CREATE POLICY IF NOT EXISTS "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
        CREATE POLICY IF NOT EXISTS "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
        CREATE POLICY IF NOT EXISTS "profiles_select_public" ON public.profiles FOR SELECT USING (true);
      `
    })

    if (profilesError) {
      console.log('⚠️  Profiles table creation (this might already exist):', profilesError.message)
    } else {
      console.log('✅ Profiles table created successfully')
    }

    // Create posts table
    console.log('📝 Creating posts table...')
    const { error: postsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TYPE IF NOT EXISTS post_status AS ENUM ('draft', 'published', 'archived');
        
        CREATE TABLE IF NOT EXISTS public.posts (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          slug text UNIQUE NOT NULL,
          content text NOT NULL,
          excerpt text,
          featured_image text,
          author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          category text NOT NULL,
          tags text[] DEFAULT '{}',
          status post_status DEFAULT 'draft',
          featured boolean DEFAULT false,
          view_count integer DEFAULT 0,
          reading_time integer DEFAULT 0,
          created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
          published_at timestamp with time zone
        );
        
        ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "posts_select_published" ON public.posts FOR SELECT USING (status = 'published');
        CREATE POLICY IF NOT EXISTS "posts_select_own" ON public.posts FOR SELECT USING (auth.uid() = author_id);
        CREATE POLICY IF NOT EXISTS "posts_insert_own" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
        CREATE POLICY IF NOT EXISTS "posts_update_own" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
        CREATE POLICY IF NOT EXISTS "posts_delete_own" ON public.posts FOR DELETE USING (auth.uid() = author_id);
        
        CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts(author_id);
        CREATE INDEX IF NOT EXISTS posts_category_idx ON public.posts(category);
        CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts(status);
        CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at DESC);
        CREATE INDEX IF NOT EXISTS posts_slug_idx ON public.posts(slug);
      `
    })

    if (postsError) {
      console.log('⚠️  Posts table creation (this might already exist):', postsError.message)
    } else {
      console.log('✅ Posts table created successfully')
    }

    // Create likes table
    console.log('📝 Creating likes table...')
    const { error: likesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.likes (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
          created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
          UNIQUE(user_id, post_id)
        );
        
        ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "likes_select_own" ON public.likes FOR SELECT USING (auth.uid() = user_id);
        CREATE POLICY IF NOT EXISTS "likes_insert_own" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY IF NOT EXISTS "likes_delete_own" ON public.likes FOR DELETE USING (auth.uid() = user_id);
      `
    })

    if (likesError) {
      console.log('⚠️  Likes table creation (this might already exist):', likesError.message)
    } else {
      console.log('✅ Likes table created successfully')
    }

    // Create bookmarks table
    console.log('📝 Creating bookmarks table...')
    const { error: bookmarksError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.bookmarks (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
          created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
          UNIQUE(user_id, post_id)
        );
        
        ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY IF NOT EXISTS "bookmarks_select_own" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
        CREATE POLICY IF NOT EXISTS "bookmarks_insert_own" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
        CREATE POLICY IF NOT EXISTS "bookmarks_delete_own" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);
      `
    })

    if (bookmarksError) {
      console.log('⚠️  Bookmarks table creation (this might already exist):', bookmarksError.message)
    } else {
      console.log('✅ Bookmarks table created successfully')
    }

    console.log('🎉 Database setup completed!')
    console.log('📊 Now you can run the sample data insertion script')

  } catch (error) {
    console.error('❌ Error setting up database:', error)
  }
}

setupDatabase()

