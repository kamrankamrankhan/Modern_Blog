-- Insert sample blog posts data
-- This will populate the database with sample content to make the application functional

-- First, let's create a sample user profile if it doesn't exist
INSERT INTO public.profiles (id, display_name, bio, avatar_url)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'MetaBlog Team',
  'The official MetaBlog team bringing you the latest insights and stories.',
  '/jason-francisco-headshot.png'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts
INSERT INTO public.posts (
  id,
  title,
  slug,
  content,
  excerpt,
  featured_image,
  author_id,
  category,
  tags,
  status,
  featured,
  view_count,
  reading_time,
  published_at
) VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  'The Impact of Technology on the Workplace: How Technology is Changing Everything',
  'impact-of-technology-on-workplace',
  'Technology has fundamentally transformed the way we work, communicate, and collaborate in modern workplaces. From remote work tools to AI-powered productivity solutions, the digital revolution continues to reshape our professional lives.

In this comprehensive guide, we explore the key technological trends that are driving workplace transformation, including cloud computing, artificial intelligence, automation, and digital collaboration platforms.

The COVID-19 pandemic accelerated the adoption of remote work technologies, making video conferencing, project management tools, and cloud-based systems essential for business continuity. Companies that embraced these technologies found themselves better positioned to adapt to changing circumstances.

Artificial intelligence is another game-changer, automating routine tasks and providing insights that help employees make better decisions. From chatbots handling customer inquiries to AI-powered analytics tools, these technologies are freeing up human workers to focus on more creative and strategic tasks.

The future of work is undoubtedly digital, and organizations that invest in the right technologies while maintaining a human-centered approach will thrive in this new era.',
  'Explore how technology is reshaping modern workplaces, from remote work tools to AI-powered productivity solutions.',
  '/modern-office-women-tech.png',
  '00000000-0000-0000-0000-000000000001',
  'Technology',
  ARRAY['workplace', 'technology', 'remote-work', 'AI', 'productivity'],
  'published',
  true,
  1250,
  8,
  NOW()
),
(
  '00000000-0000-0000-0000-000000000002',
  'Sustainable Living: A Guide to Eco-Friendly Home Practices',
  'sustainable-living-eco-friendly-home',
  'Creating an eco-friendly home is not just about saving money—it''s about protecting our planet for future generations. Sustainable living practices can significantly reduce your environmental impact while improving your quality of life.

Start with energy efficiency: switch to LED lighting, install programmable thermostats, and consider renewable energy sources like solar panels. These changes can reduce your carbon footprint and energy bills simultaneously.

Water conservation is another crucial aspect. Install low-flow fixtures, collect rainwater for gardening, and fix leaks promptly. Small changes can add up to significant water savings over time.

When it comes to materials and products, choose sustainable options. Look for furniture made from responsibly sourced wood, use natural cleaning products, and opt for reusable items instead of disposable ones.

Gardening and composting can turn your home into a mini ecosystem. Grow your own vegetables, compost kitchen waste, and create habitats for local wildlife. These practices not only benefit the environment but also provide fresh, organic food for your family.',
  'Discover practical ways to make your home more eco-friendly and reduce your environmental impact.',
  '/rustic-sustainable-house.png',
  '00000000-0000-0000-0000-000000000001',
  'Lifestyle',
  ARRAY['sustainability', 'eco-friendly', 'home', 'green-living', 'environment'],
  'published',
  true,
  890,
  6,
  NOW()
),
(
  '00000000-0000-0000-0000-000000000003',
  'Digital Marketing Trends That Will Dominate 2024',
  'digital-marketing-trends-2024',
  'The digital marketing landscape is constantly evolving, and 2024 brings new challenges and opportunities for businesses looking to connect with their audiences effectively.

Video content continues to dominate, with short-form videos, live streaming, and interactive content leading the way. Platforms like TikTok, Instagram Reels, and YouTube Shorts are essential for reaching younger demographics.

Artificial intelligence and machine learning are revolutionizing marketing automation, personalization, and customer insights. AI-powered tools can analyze customer behavior, predict trends, and deliver personalized experiences at scale.

Voice search optimization is becoming increasingly important as more people use voice assistants. Optimizing your content for conversational queries and local search can significantly improve your visibility.

Privacy-first marketing is gaining traction as consumers become more concerned about data protection. First-party data collection, transparent privacy policies, and ethical marketing practices are now competitive advantages.

The rise of social commerce is transforming how people discover and purchase products. Integrating shopping features directly into social media platforms creates seamless customer journeys.',
  'Stay ahead of the curve with these key digital marketing trends that will shape the industry in 2024.',
  '/modern-analytics-dashboard.png',
  '00000000-0000-0000-0000-000000000001',
  'Business',
  ARRAY['digital-marketing', 'trends', 'AI', 'video-content', 'social-commerce'],
  'published',
  false,
  567,
  7,
  NOW()
),
(
  '00000000-0000-0000-0000-000000000004',
  'The Future of Electric Vehicles: What to Expect in the Next Decade',
  'future-of-electric-vehicles-next-decade',
  'Electric vehicles are rapidly becoming the future of transportation, with major automakers investing billions in EV development and governments implementing policies to accelerate adoption.

Battery technology is the key driver of EV advancement. Solid-state batteries, which offer higher energy density and faster charging, are expected to become commercially viable within the next five years. This breakthrough could eliminate range anxiety and make EVs more practical for long-distance travel.

Charging infrastructure is expanding rapidly, with companies like Tesla, Electrify America, and ChargePoint building extensive networks. Wireless charging technology is also in development, which could make charging as simple as parking your car.

Autonomous driving features are becoming standard in new EVs, with advanced driver assistance systems (ADAS) paving the way for fully self-driving vehicles. These technologies improve safety and convenience while making EVs more attractive to consumers.

The environmental benefits of EVs are significant, especially as electricity generation becomes cleaner. When powered by renewable energy, EVs can have a carbon footprint up to 70% smaller than traditional vehicles.',
  'Explore the exciting developments in electric vehicle technology and what the future holds for sustainable transportation.',
  '/vintage-orange-sports-car.png',
  '00000000-0000-0000-0000-000000000001',
  'Technology',
  ARRAY['electric-vehicles', 'battery-technology', 'autonomous-driving', 'sustainability', 'transportation'],
  'published',
  false,
  432,
  5,
  NOW()
),
(
  '00000000-0000-0000-0000-000000000005',
  'Mindful Travel: How to Experience Destinations More Deeply',
  'mindful-travel-experience-destinations-deeply',
  'Travel is not just about seeing new places—it''s about experiencing them with intention and mindfulness. Mindful travel allows you to connect more deeply with destinations, cultures, and yourself.

Start by slowing down. Instead of trying to see everything, choose fewer destinations and spend more time in each place. This approach allows you to notice details, interact with locals, and develop a deeper understanding of the culture.

Practice presence by engaging all your senses. Notice the sounds of street markets, the aromas of local cuisine, the textures of traditional crafts, and the colors of landscapes. These sensory experiences create lasting memories.

Learn about the local culture before you visit. Understanding the history, customs, and language basics shows respect and opens doors to more meaningful interactions. Consider taking a cooking class, joining a local tour, or participating in cultural activities.

Document your journey mindfully. Instead of constantly taking photos, take time to reflect and write about your experiences. This practice helps you process what you''ve learned and creates a personal record of your growth.',
  'Discover how to travel more mindfully and create deeper, more meaningful travel experiences.',
  '/tropical-island-paradise.png',
  '00000000-0000-0000-0000-000000000001',
  'Travel',
  ARRAY['mindful-travel', 'cultural-immersion', 'slow-travel', 'personal-growth', 'experiential-travel'],
  'published',
  false,
  298,
  4,
  NOW()
);

-- Update the sequence if needed
SELECT setval('posts_id_seq', (SELECT MAX(id::text::bigint) FROM posts), true);

