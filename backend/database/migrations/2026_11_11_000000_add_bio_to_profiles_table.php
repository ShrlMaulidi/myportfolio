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
            $table->text('bio')->nullable()->after('jobEn');
            $table->text('bioEn')->nullable()->after('bio');
        });

        // Isi dengan teks yang sebelumnya hardcode di Hero.jsx
        DB::table('profiles')->whereNull('bio')->update([
            'bio' => 'Seorang mahasiswa Informatika yang memiliki minat besar dalam dunia teknologi, khususnya desain dan pengembangan perangkat lunak. Saya gemar mengeksplorasi desain antarmuka **(UI/UX)** dan **Coding** untuk menciptakan solusi kreatif yang fungsional. Saya percaya teknologi adalah alat untuk inovasi, dan saya terus mengasah keterampilan untuk berkontribusi di industri IT. Mari terhubung untuk berdiskusi atau berkolaborasi!',
            'bioEn' => "An Informatics student with a strong interest in technology, specifically software design and development. I enjoy exploring interface design **(UI/UX)** and **Coding** to create functional and creative solutions. I believe technology is a tool for innovation, and I continuously hone my skills to contribute to the IT industry. Let's connect for discussions or collaborations!",
        ]);
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['bio', 'bioEn']);
        });
    }
};
