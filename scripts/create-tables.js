const { createClient } = require('@supabase/supabase-js')

// Your Supabase credentials
const supabaseUrl = 'https://qfmtwomncmaucdczpwqd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbXR3b21uY21hdWNkY3pwd3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MzEyMjUsImV4cCI6MjA3MTMwNzIyNX0.yh41ZbXgfHl9z3LtXSBdhB1NamdiIX8RpyRmo_JYxZc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTables() {
  console.log('Creating database tables...')

  try {
    // Create profiles table
    console.log('Creating profiles table...')
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

        CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
        CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
        CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
        CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
        CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT USING (true);
      `
    })

    if (profilesError) {
      console.log('Profiles table error:', profilesError)
    } else {
      console.log('✅ Profiles table created successfully')
    }

    // Create post_status enum and posts table
    console.log('Creating posts table...')
    const { error: postsError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$ BEGIN
          CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;

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

        CREATE POLICY "posts_select_published" ON public.posts FOR SELECT USING (status = 'published');
        CREATE POLICY "posts_select_own" ON public.posts FOR SELECT USING (auth.uid() = author_id);
        CREATE POLICY "posts_insert_own" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
        CREATE POLICY "posts_update_own" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
        CREATE POLICY "posts_delete_own" ON public.posts FOR DELETE USING (auth.uid() = author_id);

        CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts(author_id);
        CREATE INDEX IF NOT EXISTS posts_category_idx ON public.posts(category);
        CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts(status);
        CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at DESC);
        CREATE INDEX IF NOT EXISTS posts_slug_idx ON public.posts(slug);
      `
    })

    if (postsError) {
      console.log('Posts table error:', postsError)
    } else {
      console.log('✅ Posts table created successfully')
    }

    // Create comments table
    console.log('Creating comments table...')
    const { error: commentsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.comments (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
          author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          parent_id uuid REFERENCES public.comments(id) ON DELETE CASCADE,
          content text NOT NULL,
          created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
          updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
        );

        CREATE INDEX IF NOT EXISTS comments_post_id_idx ON public.comments(post_id);
        CREATE INDEX IF NOT EXISTS comments_author_id_idx ON public.comments(author_id);
        CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON public.comments(parent_id);
        CREATE INDEX IF NOT EXISTS comments_created_at_idx ON public.comments(created_at);

        ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "Users can view all comments" ON public.comments FOR SELECT USING (true);
        CREATE POLICY "Authenticated users can insert comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
        CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = author_id);
        CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = author_id);
      `
    })

    if (commentsError) {
      console.log('Comments table error:', commentsError)
    } else {
      console.log('✅ Comments table created successfully')
    }

    console.log('🎉 All tables created successfully!')
    console.log('You can now publish blog posts and use the full functionality.')

  } catch (error) {
    console.error('Error creating tables:', error)
  }
}

createTables()
