<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Achievement;
use App\Models\Career;
use App\Models\Gallery;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Projects
        Project::insert([
            ['title' => 'myportfolio-shrlmaulidi V2', 'titleEn' => 'myportfolio-shrlmaulidi V2', 'desc' => 'Personal website & portfolio, built from scratch using React JS, dan Tailwind CSS. Menampilkan profil, keahlian, dan portofolio secara interaktif.', 'descEn' => 'Personal website & portfolio, built from scratch using React JS and Tailwind CSS. Displays profile, skills, and portfolio interactively.', 'image' => '/proyek/portfolio.png', 'tech' => json_encode(["Tailwind", "React", "JS"]), 'link' => 'https://myportfolio-shrlmaulidi.vercel.app', 'featured' => true],
            ['title' => 'CilotoTrack', 'titleEn' => 'CilotoTrack', 'desc' => 'CilotoTrack adalah sebuah website berbasis web yang digunakan untuk memantau, mengelola, dan mengorganisir tugas karyawan secara terpusat. Website ini membantu perusahaan dalam mengatur pembagian tugas, memantau progres pekerjaan secara real-time, serta meningkatkan produktivitas dan koordinasi antar tim dengan tampilan yang modern dan mudah digunakan.', 'descEn' => 'CilotoTrack is a web-based application used to monitor, manage, and organize employee tasks centrally. This website helps the company distribute tasks, monitor work progress in real-time, and improve productivity and coordination between teams with a modern and user-friendly interface.', 'image' => '/proyek/bbpk.png', 'tech' => json_encode(["React", "PHP", "Mysql", "Laravel", "Tailwind", "JS"]), 'link' => 'https://cilotrack.bbpkciloto.or.id/', 'featured' => true],
            ['title' => 'Sibas (Sistem Pelaporan Bank Sampah)', 'titleEn' => 'Sibas (Waste Bank Reporting System)', 'desc' => 'Sibas adalah sebuah website sistem pelaporan bank sampah yang digunakan untuk memudahkan masyarakat dalam melaporkan sampah yang siap untuk diangkut.', 'descEn' => 'Sibas is a waste bank reporting system website designed to make it easier for the community to report waste that is ready to be collected and transported.', 'image' => '/proyek/websibas.png', 'tech' => json_encode(["PHP", "Mysql", "CSS", "HTML", "JS", "Bootstrap"]), 'link' => 'https://sibas-landing.vercel.app', 'featured' => false],
            ['title' => 'My Portfolio V1', 'titleEn' => 'My Portfolio V1', 'desc' => 'Personal website & portfolio, built from scratch using HTML, dan Tailwind CSS. Menampilkan profil, keahlian, dan portofolio secara interaktif.', 'descEn' => 'Personal website & portfolio, built from scratch using HTML and Tailwind CSS. Displays profile, skills, and portfolio interactively.', 'image' => '/proyek/portfoliov1.png', 'tech' => json_encode(["HTML", "JS", "Tailwind"]), 'link' => 'https://shrlmaulidi29.netlify.app', 'featured' => false],
            ['title' => 'Sistem Presensi Siswa SMA', 'titleEn' => 'High School Student Attendance System', 'desc' => 'Sistem absensi siswa berbasis lokasi (GPS) dan foto selfie untuk SMAN 3 Cikampek.', 'descEn' => 'Location-based student attendance system (GPS) with selfie verification for SMAN 3 Cikampek.', 'image' => '/proyek/sman.jpg', 'tech' => json_encode(["Laravel", "PHP", "Tailwind"]), 'link' => '#', 'featured' => false],
            ['title' => 'Company Profile PT Aztara Indo', 'titleEn' => 'Company Profile PT Aztara Indo', 'desc' => 'Website Company Profile PT Aztara Indo Contraction.', 'descEn' => 'Company Profile Website for PT Aztara Indo Construction.', 'image' => '/proyek/aztara.png', 'tech' => json_encode(["Laravel", "PHP", "Tailwind"]), 'link' => 'https://aztaraindo.co.id/', 'featured' => false],
            ['title' => 'Desain Logo Personal Branding', 'titleEn' => 'Personal Branding Logo Design', 'desc' => 'Kumpulan desain logo dan identitas visual yang saya buat untuk kebutuhan personal branding dan klien. Mengedepankan konsep minimalis dan modern.', 'descEn' => 'A collection of logo designs and visual identities I created for personal branding and clients. Emphasizing minimalist and modern concepts.', 'image' => '/proyek/logo1.png', 'tech' => json_encode(["Figma"]), 'link' => '', 'featured' => false],
        ]);

        // 2. Skills
        Skill::insert([
            ['name' => 'HTML', 'icon' => '/skill/html.png', 'color' => 'from-orange-400 to-orange-600'],
            ['name' => 'CSS', 'icon' => '/skill/css.png', 'color' => 'from-blue-400 to-blue-600'],
            ['name' => 'Bootstrap', 'icon' => '/skill/bootstrap.png', 'color' => 'from-purple-500 to-purple-700'],
            ['name' => 'Tailwind', 'icon' => '/skill/tailwind.png', 'color' => 'from-cyan-400 to-cyan-600'],
            ['name' => 'JS', 'icon' => '/skill/javascript.png', 'color' => 'from-yellow-300 to-yellow-500'],
            ['name' => 'Git', 'icon' => '/skill/git.png', 'color' => 'from-red-500 to-red-700'],
            ['name' => 'Mysql', 'icon' => '/skill/mysql.png', 'color' => 'from-blue-500 to-sky-600'],
            ['name' => 'React', 'icon' => '/skill/react.png', 'color' => 'from-cyan-300 to-cyan-500'],
            ['name' => 'Laravel', 'icon' => '/skill/laravel.png', 'color' => 'from-red-500 to-red-700'],
            ['name' => 'PHP', 'icon' => '/skill/php.png', 'color' => 'from-indigo-400 to-blue-500'],
            ['name' => 'Figma', 'icon' => '/skill/figma.png', 'color' => 'from-red-500 to-red-700'],
            ['name' => 'Excel', 'icon' => '/skill/excel.png', 'color' => 'from-green-400 to-green-600'],
            ['name' => 'Word', 'icon' => '/skill/word.png', 'color' => 'from-indigo-400 to-indigo-600'],
        ]);

        // 3. Achievements
        Achievement::insert([
            ['title' => 'Alibaba Cloud Certified Associate', 'titleEn' => 'Alibaba Cloud Certified Associate', 'issuer' => 'Alibaba Academy', 'date' => '2025 - 2027', 'dateEn' => '2025 - 2027', 'image' => '/achievement/alibaba.png'],
            ['title' => 'Sertifikat Kewirausahaan Digital', 'titleEn' => 'Digital Entrepreneurship Certificate', 'issuer' => 'Digitalent', 'date' => 'Agustus 2023', 'dateEn' => 'August 2023', 'image' => '/achievement/dea.jpg'],
            ['title' => 'Seminar Cyber Security', 'titleEn' => 'Cyber Security Seminar', 'issuer' => 'ID-Networkers', 'date' => 'Agustus 2024', 'dateEn' => 'August 2024', 'image' => '/achievement/cyber.png'],
            ['title' => 'Certificate Next Generation ECS and OSS', 'titleEn' => 'Certificate Next Generation ECS and OSS', 'issuer' => 'Alibaba Cloud', 'date' => '2025 - 2026', 'dateEn' => '2025 - 2026', 'image' => '/achievement/alibaba2.png'],
            ['title' => 'VPC Fundamental', 'titleEn' => 'VPC Fundamental', 'issuer' => 'Alibaba Cloud', 'date' => '2025 - 2026', 'dateEn' => '2025 - 2026', 'image' => '/achievement/VPC.png'],
            ['title' => 'Secure and Fast - Alibaba Cloud Elastic Compute Service', 'titleEn' => 'Secure and Fast - Alibaba Cloud Elastic Compute Service', 'issuer' => 'Alibaba Cloud', 'date' => '2025 - 2026', 'dateEn' => '2025 - 2026', 'image' => '/achievement/alibaba3.png'],
            ['title' => 'Sertifikat Magang', 'titleEn' => 'Internship Certificate', 'issuer' => 'Kemenkes BBPK Ciloto', 'date' => '2025 - 2026', 'dateEn' => '2025 - 2026', 'image' => '/achievement/sertifikatmagang.png'],
        ]);

        // 4. Careers
        Career::insert([
            ['role' => 'Web Developer', 'company' => 'Balai Besar Pelatihan Kesehatan Ciloto', 'location' => 'Cianjur, Indonesia 🇮🇩', 'logo' => '/img/career/bbpk.jpg', 'period' => 'Jul 2025 - Nov 2025', 'duration' => '5 Months', 'type' => 'Internship', 'typeEn' => 'Internship', 'work_mode' => 'Remote', 'responsibilities' => json_encode([
                "Mengembangkan website menejemen tugas.",
                "Melakukan optimasi query database MySql untuk meningkatkan performa backend.",
                "Menggunakan teknologi React JS & Laravel 11",
                "Menyusun laporan dan membuat E-Book Panduan Penggunaan."
            ]), 'responsibilitiesEn' => json_encode([
                "Developed a task management website.",
                "Optimized MySQL database queries to improve backend performance.",
                "Utilized React JS & Laravel 11 technologies.",
                "Compiled reports and created a User Guide E-Book."
            ])],
            ['role' => 'Staff Administration', 'company' => 'PT. Media Solusi Sukses', 'location' => 'Karawang, Indonesia 🇮🇩', 'logo' => '/img/career/mss.png', 'period' => 'Mar 2025 - Now', 'duration' => 'until now', 'type' => 'Full Time', 'typeEn' => 'Full Time', 'work_mode' => 'Onsite', 'responsibilities' => json_encode([
                "Mempersiapkan dan mengelola dokumen administrasi bisnis, termasuk Purchase Order (PO), Berita Acara, dan surat konfirmasi.",
                "Bertanggung jawab atas siklus penagihan (billing) dengan menerbitkan dan memproses invoice pelanggan.",
                "Mengelola administrasi database pelanggan serta melakukan rekapitulasi data dan absensi karyawan."
            ]), 'responsibilitiesEn' => json_encode([
                "Prepared and managed business administration documents, including Purchase Orders (PO), Handover Certificates, and confirmation letters.",
                "Responsible for the billing cycle by issuing and processing customer invoices.",
                "Managed customer database administration and recapitulated employee data and attendance."
            ])],
        ]);

        // 5. Galleries
        Gallery::insert([
            ['src' => '/gallery/02.png', 'category' => 'Kegiatan', 'categoryEn' => 'Activity', 'caption' => 'My Editor', 'captionEn' => 'My Editor'],
            ['src' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1740&auto=format&fit=crop', 'category' => 'Workspace', 'categoryEn' => 'Workspace', 'caption' => 'Setup Coding Malam Hari 🌙', 'captionEn' => 'Late Night Coding Setup 🌙'],
            ['src' => '/gallery/logo v2.png', 'category' => 'Kegiatan', 'categoryEn' => 'Activity', 'caption' => 'My Logo Personal Branding', 'captionEn' => 'My Personal Branding Logo'],
            ['src' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874&auto=format&fit=crop', 'category' => 'Travel', 'categoryEn' => 'Travel', 'caption' => 'Healing sejenak ke Alam 🌲', 'captionEn' => 'A brief healing trip to Nature 🌲'],
            ['src' => 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1740&auto=format&fit=crop', 'category' => 'Sertifikat', 'categoryEn' => 'Certificate', 'caption' => 'Lulus Sertifikasi React Developer', 'captionEn' => 'Passed React Developer Certification'],
            ['src' => 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1740&auto=format&fit=crop', 'category' => 'Workspace', 'categoryEn' => 'Workspace', 'caption' => 'Menulis Kode Backend Laravel', 'captionEn' => 'Writing Laravel Backend Code'],
        ]);

        \App\Models\Profile::create([
            'name' => 'Sahrul Maulidi',
            'username' => '@shrlmaulidi',
            'img' => '/img/profile.jpeg',
            'status' => 'Tinggal di Karawang, Indonesia 🇮🇩',
            'statusEn' => 'Based in Karawang, Indonesia 🇮🇩',
            'job' => 'Ditempat',
            'jobEn' => 'Onsite',
            'isAvailable' => true,
            'avail_status' => 'Open to Work',
            'avail_statusEn' => 'Open to Work',
            'avail_desc' => 'Siap untuk berkontribusi pada proyek inovatif atau posisi Full-time.',
            'avail_descEn' => 'Ready to contribute to innovative projects or Full-time positions.',
            'avail_link' => '/contact'
        ]);

        \App\Models\Education::insert([
            ['school' => 'Horizon University Indonesia', 'degree' => 'S1 Informatika (Bachelor\'s Degree)', 'degreeEn' => 'Informatics Engineering (Bachelor\'s Degree)', 'year' => '2022 - 2026', 'location' => 'Karawang, Indonesia 🇮🇩', 'logo' => '/img/career/horizon.jpeg']
        ]);

        \App\Models\SocialMedia::insert([
            ['title' => 'Tetap Terhubung', 'titleEn' => 'Stay Connected', 'desc' => 'Hubungi saya via email untuk pertanyaan atau kolaborasi.', 'descEn' => 'Contact me via email for inquiries or collaborations.', 'btnText' => 'Pergi ke Gmail', 'btnTextEn' => 'Go to Gmail', 'icon' => 'Gmail', 'url' => 'mailto:sahrulmaulidi294@gmail.com', 'color' => 'bg-gradient-to-br from-[#d94838] to-[#99251a]', 'span' => 'md:col-span-2'],
            ['title' => 'Ikuti Perjalanan Saya', 'titleEn' => 'Follow My Journey', 'desc' => 'Ikuti perjalanan kreatif saya.', 'descEn' => 'Follow my creative journey.', 'btnText' => 'Pergi ke Instagram', 'btnTextEn' => 'Go to Instagram', 'icon' => 'Instagram', 'url' => 'https://www.instagram.com/_shrlmaulidi29', 'color' => 'bg-gradient-to-br from-[#8a3ab9] via-[#e95950] to-[#fccc63]', 'span' => 'md:col-span-1'],
            ['title' => 'Mari Terhubung', 'titleEn' => 'Let\'s Connect', 'desc' => 'Terhubung secara profesional dengan saya.', 'descEn' => 'Connect with me professionally.', 'btnText' => 'Pergi ke Linkedin', 'btnTextEn' => 'Go to LinkedIn', 'icon' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/sahrulmaulidi/', 'color' => 'bg-gradient-to-br from-[#0077b5] to-[#004182]', 'span' => 'md:col-span-1'],
            ['title' => 'Ikut Seru-seruan', 'titleEn' => 'Join the Fun', 'desc' => 'Tonton konten yang seru dan menarik.', 'descEn' => 'Watch fun and engaging content.', 'btnText' => 'Pergi ke Tiktok', 'btnTextEn' => 'Go to TikTok', 'icon' => 'TikTok', 'url' => 'https://www.tiktok.com/@shrlmaulidi?_r=1&_t=ZS-92xVIcETpXI', 'color' => 'bg-gradient-to-br from-[#1f1f1f] to-[#000000]', 'span' => 'md:col-span-1'],
            ['title' => 'Jelajahi Kode', 'titleEn' => 'Explore Code', 'desc' => 'Lihat karya open-source saya.', 'descEn' => 'Check out my open-source work.', 'btnText' => 'Pergi ke Github', 'btnTextEn' => 'Go to GitHub', 'icon' => 'GitHub', 'url' => 'https://github.com/ShrlMaulidi', 'color' => 'bg-gradient-to-br from-[#171515] to-[#0d1117]', 'span' => 'md:col-span-1'],
        ]);

        \App\Models\DashboardStat::insert([
            ['label' => 'Total Komit (2025)', 'labelEn' => 'Total Commits (2025)', 'value' => '1,240', 'icon' => '🔥', 'color' => 'bg-orange-500/10 text-orange-500'],
            ['label' => 'Jam Koding', 'labelEn' => 'Coding Hours', 'value' => '3,500+', 'icon' => '⚡', 'color' => 'bg-yellow-500/10 text-yellow-500'],
            ['label' => 'Project Selesai', 'labelEn' => 'Projects Completed', 'value' => '12', 'icon' => '🚀', 'color' => 'bg-green-500/10 text-green-500'],
            ['label' => 'Kopi Diminum', 'labelEn' => 'Coffees Drank', 'value' => '∞', 'icon' => '☕', 'color' => 'bg-blue-500/10 text-blue-500'],
        ]);

        \App\Models\TopLanguage::insert([
            ['name' => 'JavaScript / React', 'percent' => 60, 'color' => 'bg-yellow-400'],
            ['name' => 'PHP / Laravel', 'percent' => 25, 'color' => 'bg-red-500'],
            ['name' => 'CSS / Tailwind', 'percent' => 15, 'color' => 'bg-cyan-400'],
        ]);

        \App\Models\Tool::insert([
            ['name' => 'VS Code', 'icon' => '💻', 'desc' => 'Editor Utama', 'descEn' => 'Main Editor'],
            ['name' => 'Figma', 'icon' => '🎨', 'desc' => 'Desain UI', 'descEn' => 'UI Design'],
            ['name' => 'Postman', 'icon' => '🚀', 'desc' => 'API Testing', 'descEn' => 'API Testing'],
            ['name' => 'Terminal', 'icon' => '⌨️', 'desc' => 'Git Bash', 'descEn' => 'Git Bash'],
        ]);

        \App\Models\LearningGoal::insert([
            ['name' => 'React JS', 'status' => 'In Progress', 'statusEn' => 'In Progress', 'color' => 'text-yellow-500'],
            ['name' => 'Laravel', 'status' => 'Done', 'statusEn' => 'Done', 'color' => 'text-green-500'],
            ['name' => 'Next JS', 'status' => 'Next', 'statusEn' => 'Next', 'color' => 'text-gray-500'],
        ]);
    }
}
