<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use App\Models\Article;
use App\Models\ClientLogo;
use App\Models\PortfolioProject;
use App\Models\ServiceItem;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        AdminUser::updateOrCreate(
            ['email' => 'admin@bytecorner.id'],
            [
                'name' => 'Ahmad Fadly',
                'password' => 'admin123',
                'role' => 'Super Admin',
                'profile_photo' => 'https://i.pravatar.cc/120?img=12',
                'status' => 'active',
            ]
        );

        AdminUser::updateOrCreate(
            ['email' => 'dewi@bytecorner.id'],
            [
                'name' => 'Dewi Lestari',
                'password' => 'editor123',
                'role' => 'Editor',
                'profile_photo' => 'https://i.pravatar.cc/120?img=47',
                'status' => 'active',
            ]
        );

        foreach ($this->services() as $index => $service) {
            ServiceItem::updateOrCreate(['slug' => $service['slug']], $service + ['sort_order' => $index + 1]);
        }

        foreach ($this->portfolio() as $index => $portfolio) {
            PortfolioProject::updateOrCreate(['slug' => $portfolio['slug']], $portfolio + ['sort_order' => $index + 1]);
        }

        foreach ($this->articles() as $index => $article) {
            Article::updateOrCreate(['slug' => $article['slug']], $article + ['sort_order' => $index + 1]);
        }

        foreach ($this->logos() as $index => $logo) {
            ClientLogo::updateOrCreate(['name' => $logo['name']], $logo + ['sort_order' => $index + 1]);
        }
    }

    private function image(string $id, int $width = 1200): string
    {
        return "https://images.unsplash.com/{$id}?auto=format&fit=crop&w={$width}&q=80";
    }

    private function services(): array
    {
        return [
            [
                'slug' => 'web-development',
                'category' => 'Development',
                'title_id' => 'Web Development',
                'title_en' => 'Web Development',
                'excerpt_id' => 'Pengembangan website modern, cepat, aman, dan scalable.',
                'excerpt_en' => 'Modern, fast, secure and scalable websites built to grow your business.',
                'description_id' => 'Kami membangun website performant menggunakan teknologi terkini, mendukung pertumbuhan bisnis dengan arsitektur scalable, SEO-friendly dan mudah dikelola.',
                'description_en' => 'We build performant websites with the latest tech stack, scalable architecture, SEO-friendly markup and easy content management.',
                'icon' => 'Code2',
                'main_image' => $this->image('photo-1551434678-e076c223a692'),
                'features' => ['High Performance', 'Scalable & Secure', 'SEO Friendly', 'Easy to Manage'],
                'faq' => [
                    ['q' => 'How long does a website take?', 'a' => 'Typical builds run 4-10 weeks depending on scope.'],
                    ['q' => 'Do you provide ongoing support?', 'a' => 'Yes, we offer monthly maintenance and growth packages.'],
                ],
                'status' => 'published',
                'featured' => true,
            ],
            [
                'slug' => 'ui-ux-design',
                'category' => 'Design',
                'title_id' => 'UI/UX Design',
                'title_en' => 'UI/UX Design',
                'excerpt_id' => 'Desain antarmuka yang intuitif dan berorientasi pengguna.',
                'excerpt_en' => 'Intuitive, user-centred interfaces that convert.',
                'description_id' => 'Riset, wireframing, design system dan prototyping untuk pengalaman digital yang berkesan.',
                'description_en' => 'Research, wireframing, design systems and prototyping for memorable digital experiences.',
                'icon' => 'Palette',
                'main_image' => $this->image('photo-1558655146-9f40138edfeb'),
                'features' => ['User Research', 'Wireframing & Prototyping', 'Design System', 'Usability Testing'],
                'faq' => [['q' => 'Do you handle handoff?', 'a' => 'Yes, we deliver Figma files and developer handoff notes.']],
                'status' => 'published',
                'featured' => false,
            ],
            [
                'slug' => 'digital-marketing',
                'category' => 'Marketing',
                'title_id' => 'Digital Marketing',
                'title_en' => 'Digital Marketing',
                'excerpt_id' => 'Strategi pemasaran digital untuk meningkatkan brand dan penjualan.',
                'excerpt_en' => 'Digital marketing strategies that grow brand and sales.',
                'description_id' => 'SEO, paid ads, content marketing dan social campaign yang terukur.',
                'description_en' => 'Measurable SEO, paid ads, content and social campaigns.',
                'icon' => 'Megaphone',
                'main_image' => $this->image('photo-1460925895917-afdab827c52f'),
                'features' => ['SEO Optimisation', 'Paid Acquisition', 'Content Strategy', 'Performance Tracking'],
                'faq' => [],
                'status' => 'published',
                'featured' => false,
            ],
            [
                'slug' => 'mobile-development',
                'category' => 'Development',
                'title_id' => 'Mobile Development',
                'title_en' => 'Mobile Development',
                'excerpt_id' => 'Aplikasi mobile berkualitas tinggi untuk iOS dan Android.',
                'excerpt_en' => 'High-quality mobile apps for iOS and Android.',
                'description_id' => 'Native dan cross-platform mobile development untuk produk digital yang stabil.',
                'description_en' => 'Native and cross-platform mobile development for reliable digital products.',
                'icon' => 'Smartphone',
                'main_image' => $this->image('photo-1512941937669-90a1b58e7e9c'),
                'features' => ['iOS & Android', 'Cross-platform', 'Push & Realtime', 'App Store Launch'],
                'faq' => [],
                'status' => 'published',
                'featured' => false,
            ],
            [
                'slug' => 'company-profile-website',
                'category' => 'Website',
                'title_id' => 'Company Profile Website',
                'title_en' => 'Company Profile Website',
                'excerpt_id' => 'Website profesional untuk membangun kredibilitas bisnis.',
                'excerpt_en' => 'Professional websites to build business credibility.',
                'description_id' => 'Website company profile premium yang memperkuat brand Anda.',
                'description_en' => 'Premium company profile sites that strengthen your brand.',
                'icon' => 'Building2',
                'main_image' => $this->image('photo-1497366216548-37526070297c'),
                'features' => ['Custom Design', 'CMS Built-in', 'Mobile Friendly', 'SEO Ready'],
                'faq' => [],
                'status' => 'published',
                'featured' => false,
            ],
            [
                'slug' => 'landing-page',
                'category' => 'Website',
                'title_id' => 'Landing Page',
                'title_en' => 'Landing Page',
                'excerpt_id' => 'Halaman khusus yang dioptimalkan untuk konversi maksimal.',
                'excerpt_en' => 'Dedicated pages optimised for maximum conversion.',
                'description_id' => 'Landing page berperforma tinggi untuk kampanye digital Anda.',
                'description_en' => 'High-performing landing pages for your campaigns.',
                'icon' => 'Rocket',
                'main_image' => $this->image('photo-1432888622747-4eb9a8efeb07'),
                'features' => ['A/B Tested', 'Fast Loading', 'Lead Capture', 'Analytics'],
                'faq' => [],
                'status' => 'published',
                'featured' => false,
            ],
        ];
    }

    private function portfolio(): array
    {
        return [
            [
                'slug' => 'paragon-technology',
                'client' => 'Paragon Technology',
                'category' => 'Website',
                'title_id' => 'Paragon Technology - Corporate Website Redesign',
                'title_en' => 'Paragon Technology - Corporate Website Redesign',
                'description_id' => 'Redesain website korporat dengan pendekatan modern.',
                'description_en' => 'Corporate redesign with a modern, performant approach.',
                'overview_id' => 'Redesain menyeluruh untuk meningkatkan trafik, lead, dan persepsi brand.',
                'overview_en' => 'A full redesign aimed at growing traffic, leads and brand perception.',
                'challenge_id' => 'Website lama lambat dan tidak mobile-friendly.',
                'challenge_en' => 'The old site was slow and not mobile-friendly.',
                'solution_id' => 'Arsitektur baru, design system fresh, performance-first.',
                'solution_en' => 'New architecture, fresh design system, performance-first build.',
                'tech_stack' => ['Next.js', 'Tailwind', 'Sanity'],
                'project_date' => '2024-04-12',
                'project_url' => 'https://www.paragon-innovation.com/',
                'preview_url' => 'https://www.paragon-innovation.com/',
                'main_image' => $this->image('photo-1497366216548-37526070297c'),
                'gallery' => [$this->image('photo-1497366216548-37526070297c'), $this->image('photo-1499951360447-b19be8fe80f5'), $this->image('photo-1517245386807-bb43f82c33c4')],
                'metrics' => [['label' => 'Traffic +', 'value' => '125%'], ['label' => 'Leads +', 'value' => '68%'], ['label' => 'Performance', 'value' => '98/100']],
                'status' => 'published',
                'featured' => true,
            ],
            [
                'slug' => 'koinworks-dashboard',
                'client' => 'KoinWorks',
                'category' => 'Web App',
                'title_id' => 'KoinWorks Dashboard',
                'title_en' => 'KoinWorks Dashboard',
                'description_id' => 'Dashboard finansial untuk monitoring kinerja real-time.',
                'description_en' => 'Financial dashboard for real-time performance monitoring.',
                'overview_id' => 'Dashboard fintech real-time untuk tim operasional.',
                'overview_en' => 'Realtime fintech dashboard for operations teams.',
                'challenge_id' => 'Data kompleks dan banyak peran pengguna.',
                'challenge_en' => 'Complex data and many user roles.',
                'solution_id' => 'Chart modular dan tampilan berbasis role.',
                'solution_en' => 'Modular charts and role-based views.',
                'tech_stack' => ['React', 'Recharts', 'Node.js'],
                'project_date' => '2024-03-20',
                'project_url' => 'https://koinworks.com/',
                'preview_url' => 'https://koinworks.com/',
                'main_image' => $this->image('photo-1551288049-bebda4e38f71'),
                'gallery' => [$this->image('photo-1551288049-bebda4e38f71'), $this->image('photo-1460925895917-afdab827c52f')],
                'metrics' => null,
                'status' => 'published',
                'featured' => false,
            ],
            [
                'slug' => 'ruangguru-learning',
                'client' => 'Ruangguru',
                'category' => 'Mobile App',
                'title_id' => 'Ruangguru Learning App',
                'title_en' => 'Ruangguru Learning App',
                'description_id' => 'Aplikasi mobile untuk platform belajar online.',
                'description_en' => 'Mobile app for online learning platform.',
                'overview_id' => 'Pengalaman mobile learning yang engaging.',
                'overview_en' => 'Engaging mobile learning experience.',
                'challenge_id' => 'Persona siswa yang beragam.',
                'challenge_en' => 'Diverse student personas.',
                'solution_id' => 'Rekomendasi personal dan navigasi sederhana.',
                'solution_en' => 'Personalised recommendations and simple navigation.',
                'tech_stack' => ['React Native', 'Firebase'],
                'project_date' => '2024-03-05',
                'project_url' => 'https://www.ruangguru.com/',
                'preview_url' => 'https://www.ruangguru.com/',
                'main_image' => $this->image('photo-1512941937669-90a1b58e7e9c'),
                'gallery' => [$this->image('photo-1512941937669-90a1b58e7e9c')],
                'metrics' => null,
                'status' => 'published',
                'featured' => false,
            ],
        ];
    }

    private function articles(): array
    {
        return [
            [
                'slug' => '5-strategi-digital-marketing-2024',
                'title_id' => '5 Strategi Digital Marketing untuk Meningkatkan Brand Awareness 2024',
                'title_en' => '5 Digital Marketing Strategies to Boost Brand Awareness in 2024',
                'excerpt_id' => 'Strategi digital marketing yang tepat membantu bisnis menjangkau audiens lebih luas.',
                'excerpt_en' => 'The right digital marketing strategy helps business reach wider audiences.',
                'content_id' => '<p>Brand awareness adalah fondasi penting.</p><h2>1. Konten yang Konsisten</h2><p>Konsistensi membangun kepercayaan.</p><ul><li>Tetapkan jadwal posting</li><li>Pertahankan tone of voice</li></ul>',
                'content_en' => '<p>Brand awareness is the foundation.</p><h2>1. Consistent Content</h2><p>Consistency builds trust.</p><ul><li>Set a posting schedule</li><li>Maintain tone of voice</li></ul>',
                'category' => 'Digital Marketing',
                'author' => 'Ahmad Fadly',
                'author_avatar' => 'https://i.pravatar.cc/120?img=12',
                'published_date' => '2024-05-15',
                'reading_time' => 5,
                'featured_image' => $this->image('photo-1432888622747-4eb9a8efeb07'),
                'images' => [],
                'tags' => ['marketing', 'branding'],
                'status' => 'published',
                'featured' => true,
            ],
            [
                'slug' => 'ui-ux-meningkatkan-konversi',
                'title_id' => 'Prinsip UI/UX Design yang Meningkatkan Konversi Website',
                'title_en' => 'UI/UX Design Principles That Boost Website Conversion',
                'excerpt_id' => 'UI/UX yang baik bukan hanya soal estetika.',
                'excerpt_en' => 'Great UI/UX is not just about aesthetics.',
                'content_id' => '<p>Konversi dimulai dari pengalaman yang jelas dan mudah digunakan.</p>',
                'content_en' => '<p>Conversion starts with a clear, usable experience.</p>',
                'category' => 'UI/UX',
                'author' => 'Dewi Lestari',
                'author_avatar' => 'https://i.pravatar.cc/120?img=47',
                'published_date' => '2024-05-10',
                'reading_time' => 4,
                'featured_image' => $this->image('photo-1559028012-481c04fa702d'),
                'images' => [],
                'tags' => ['design'],
                'status' => 'published',
                'featured' => false,
            ],
            [
                'slug' => 'tren-web-development-2024',
                'title_id' => 'Tren Teknologi Web Development 2024 yang Perlu Diketahui',
                'title_en' => '2024 Web Development Trends You Should Know',
                'excerpt_id' => 'Jelajahi tren teknologi web terbaru.',
                'excerpt_en' => 'Explore the latest web technology trends.',
                'content_id' => '<p>Tahun 2024 membawa banyak inovasi untuk performa, keamanan, dan DX.</p>',
                'content_en' => '<p>2024 brings many innovations for performance, security, and DX.</p>',
                'category' => 'Industry Trend',
                'author' => 'Ahmad Fadly',
                'author_avatar' => 'https://i.pravatar.cc/120?img=12',
                'published_date' => '2024-05-10',
                'reading_time' => 6,
                'featured_image' => $this->image('photo-1518770660439-4636190af475'),
                'images' => [],
                'tags' => ['tech'],
                'status' => 'published',
                'featured' => false,
            ],
        ];
    }

    private function logos(): array
    {
        return [
            ['name' => 'BCA', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg', 'website_url' => 'https://www.bca.co.id/', 'status' => 'active'],
            ['name' => 'Tokopedia', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Tokopedia.svg', 'website_url' => 'https://www.tokopedia.com/', 'status' => 'active'],
            ['name' => 'Traveloka', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Traveloka_Primary_Logo.svg', 'website_url' => 'https://www.traveloka.com/', 'status' => 'active'],
            ['name' => 'Danamon', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Bank_Danamon_logo.svg', 'website_url' => 'https://www.danamon.co.id/', 'status' => 'active'],
            ['name' => 'KoinWorks', 'image' => 'https://1000logos.net/wp-content/uploads/2023/01/KoinWorks-Logo.png', 'website_url' => 'https://koinworks.com/', 'status' => 'active'],
            ['name' => 'Paragon', 'image' => 'https://upload.wikimedia.org/wikipedia/commons/8/87/Paragon_Technology_and_Innovation.png', 'website_url' => 'https://www.paragon-innovation.com/', 'status' => 'active'],
        ];
    }
}
