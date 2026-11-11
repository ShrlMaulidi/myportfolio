<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('about_caption')->nullable()->after('bioEn');
            $table->string('about_captionEn')->nullable()->after('about_caption');
            $table->text('about')->nullable()->after('about_captionEn');
            $table->text('aboutEn')->nullable()->after('about');
        });

        // Isi dengan teks yang sebelumnya hardcode di About.jsx
        DB::table('profiles')->whereNull('about')->update([
            'about_caption' => 'Perkenalan singkat tentang siapa saya.',
            'about_captionEn' => 'A brief introduction about who I am.',
            'about' => "Halo! Terima kasih telah mengunjungi situs pribadi saya. Saya **Sahrul Maulidi**, seorang mahasiswa Informatika di **Horizon University Indonesia**. Saya adalah seorang Web Developer dengan minat besar dalam membangun produk perangkat lunak yang berdampak. Stack teknologi saya meliputi teknologi frontend modern seperti **React.js, Tailwind CSS**, serta pengembangan backend menggunakan **Laravel (PHP)**.\n\nSaya menikmati menciptakan solusi yang ramah pengguna dan memiliki performa tinggi. Baik saat membangun antarmuka yang intuitif maupun merancang layanan backend, saya selalu berusaha membawa efisiensi dan kejelasan pada setiap lapisan aplikasi. Saya pembelajar cepat yang tumbuh dalam lingkungan dinamis dan senang menyelesaikan masalah kompleks secara kolaboratif.",
            'aboutEn' => "Hello! Thank you for visiting my personal website. I am **Sahrul Maulidi**, an Informatics student at **Horizon University Indonesia**. I am a Web Developer with a strong interest in building impactful software products. My tech stack includes modern frontend technologies such as **React.js, Tailwind CSS**, as well as backend development using **Laravel (PHP)**.\n\nI enjoy creating user-friendly and high-performance solutions. Whether building intuitive interfaces or designing backend services, I always strive to bring efficiency and clarity to every layer of the application. I am a fast learner who thrives in dynamic environments and enjoys solving complex problems collaboratively.",
        ]);
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['about_caption', 'about_captionEn', 'about', 'aboutEn']);
        });
    }
};
