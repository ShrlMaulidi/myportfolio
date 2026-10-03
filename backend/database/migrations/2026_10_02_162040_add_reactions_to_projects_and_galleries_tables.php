<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('reactions')->nullable();
        });
        Schema::table('galleries', function (Blueprint $table) {
            $table->json('reactions')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('reactions');
        });
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn('reactions');
        });
    }
};
