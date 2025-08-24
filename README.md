# 🚀 Modern Blog - Next.js + Supabase Blog Platform

A modern, responsive blog platform built with Next.js 15, Supabase, and Tailwind CSS. Features a complete content management system, user authentication, and a beautiful, responsive design.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Beautiful Components**: Built with shadcn/ui and Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Modern Animations**: Smooth transitions and hover effects

### 📝 **Content Management**
- **Dashboard**: Create, edit, and manage blog posts
- **Rich Text Editor**: Full-featured content creation
- **Category Management**: Organize posts by categories
- **Tag System**: Flexible tagging for better organization
- **Featured Images**: Support for post thumbnails and hero images

### 🔐 **Authentication & User Management**
- **Supabase Auth**: Secure user authentication
- **User Profiles**: Customizable user profiles
- **Role-based Access**: Admin and user roles
- **Protected Routes**: Secure dashboard access

### 🗄️ **Database & Backend**
- **Supabase Integration**: PostgreSQL database with real-time capabilities
- **Row Level Security**: Secure data access
- **Real-time Updates**: Live content updates
- **File Storage**: Image and media file management

### 📱 **Responsive Components**
- **Hero Sections**: Engaging landing page components
- **Blog Grid**: Responsive post layouts
- **Navigation**: Mobile-friendly navigation menu
- **Forms**: Responsive input forms and validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth
- **Deployment**: Vercel-ready, Docker support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- pnpm (or npm/yarn)
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kamrankamrankhan/Modern_Blog.git
   cd Modern_Blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database setup scripts in the `scripts/` folder
   - Configure Row Level Security policies

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### 1. Create Tables
Run the SQL scripts in the `scripts/` folder:

```bash
# Create users and profiles
psql -h your_host -U your_user -d your_db -f scripts/001_create_users_profiles.sql

# Create blog posts table
psql -h your_host -U your_user -d your_db -f scripts/002_create_blog_posts.sql

# Create engagement tables
psql -h your_host -U your_user -d your_db -f scripts/003_create_engagement_tables.sql

# Create admin tables
psql -h your_host -U your_user -d your_db -f scripts/004_create_admin_tables.sql

# Insert sample data
psql -h your_host -U your_user -d your_db -f scripts/005_insert_sample_data.sql
```

### 2. Configure RLS Policies
The scripts include Row Level Security policies for secure data access.

## 📁 Project Structure

```
Modern_Blog/
├── app/                    # Next.js 15 app directory
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog listing and individual posts
│   ├── category/          # Category pages
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── engagement/       # Like, comment, bookmark components
│   └── ...               # Other component categories
├── lib/                  # Utility functions and configurations
│   ├── supabase/         # Supabase client and server configs
│   ├── auth.ts           # Authentication utilities
│   └── blog-data.tsx     # Blog data management
├── scripts/              # Database setup and migration scripts
├── public/               # Static assets
└── styles/               # Additional styling
```

## 🎯 Key Features Explained

### Blog Post Management
- **Create Posts**: Rich text editor with markdown support
- **Edit Posts**: Update existing content with version control
- **Delete Posts**: Safe deletion with confirmation
- **Publish/Draft**: Control post visibility

### User Authentication
- **Sign Up**: User registration with email verification
- **Sign In**: Secure login with Supabase Auth
- **Profile Management**: Update user information and avatars
- **Password Reset**: Secure password recovery

### Admin Features
- **User Management**: View and manage all users
- **Content Moderation**: Approve/reject posts
- **Analytics**: Basic usage statistics
- **System Settings**: Configure platform settings

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
```bash
# Build the Docker image
docker build -t modern-blog .

# Run the container
docker run -p 3000:3000 modern-blog
```

### Manual Deployment
1. Build the production version: `pnpm build`
2. Start the production server: `pnpm start`
3. Use a process manager like PM2 for production

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public Supabase key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations

### Supabase Configuration
- Enable Row Level Security
- Configure authentication providers
- Set up storage buckets for images
- Configure email templates

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Screens**: 1440px+

## 🎨 Customization

### Themes
- Modify `components/theme-provider.tsx` for custom themes
- Update Tailwind config for custom color schemes
- Customize component styles in individual component files

### Components
- All components are built with shadcn/ui for easy customization
- Modify component variants in `components/ui/` directory
- Add new components following the existing patterns

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check Supabase credentials in `.env.local`
   - Verify database is running and accessible
   - Check RLS policies are properly configured

2. **Authentication Issues**
   - Verify Supabase Auth is enabled
   - Check email templates are configured
   - Ensure proper redirect URLs are set

3. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `pnpm install`
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase Team** for the excellent backend platform
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/kamrankamrankhan/Modern_Blog/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kamrankamrankhan/Modern_Blog/discussions)
- **Email**: Contact through GitHub profile

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**

*Star this repository if you find it helpful! ⭐*
