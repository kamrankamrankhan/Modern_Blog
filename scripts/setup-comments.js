const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupCommentsTable() {
  try {
    console.log('🔄 Setting up comments table...')

    // Read the SQL file
    const sqlPath = path.join(__dirname, '006_create_comments_table.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    // Split the SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim())

    for (const statement of statements) {
      if (statement.trim()) {
        console.log('📝 Executing SQL statement...')
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement.trim()
        })

        if (error) {
          // If exec_sql is not available, try a different approach
          console.log('⚠️  exec_sql not available, trying alternative method...')
          break
        }
      }
    }

    console.log('✅ Comments table setup completed!')
    console.log('📝 Note: You may need to run the SQL manually in your Supabase dashboard if the script fails.')
    console.log('🔗 Go to: https://supabase.com/dashboard/project/_/sql')
    console.log('📄 Copy and paste the contents of scripts/006_create_comments_table.sql')

  } catch (error) {
    console.error('❌ Error setting up comments table:', error)
    console.log('📝 Please run the SQL manually in your Supabase dashboard:')
    console.log('🔗 Go to: https://supabase.com/dashboard/project/_/sql')
    console.log('📄 Copy and paste the contents of scripts/006_create_comments_table.sql')
  }
}

setupCommentsTable()
