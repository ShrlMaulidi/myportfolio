<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username');
            $table->string('img')->nullable();
            $table->string('status');
            $table->string('statusEn')->nullable();
            $table->string('job');
            $table->string('jobEn')->nullable();
            // Availability
            $table->boolean('isAvailable')->default(true);
            $table->string('avail_status')->nullable();
            $table->string('avail_statusEn')->nullable();
            $table->string('avail_desc')->nullable();
            $table->string('avail_descEn')->nullable();
            $table->string('avail_link')->nullable();
            $table->timestamps();
        });

        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->string('school');
            $table->string('degree');
            $table->string('degreeEn')->nullable();
            $table->string('year');
            $table->string('location');
            $table->string('logo')->nullable();
            $table->timestamps();
        });

        Schema::create('social_media', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('titleEn')->nullable();
            $table->string('desc');
            $table->string('descEn')->nullable();
            $table->string('btnText');
            $table->string('btnTextEn')->nullable();
            $table->string('icon');
            $table->string('url');
            $table->string('color')->nullable();
            $table->string('span')->nullable();
            $table->timestamps();
        });

        Schema::create('dashboard_stats', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->string('labelEn')->nullable();
            $table->string('value');
            $table->string('icon');
            $table->string('color')->nullable();
            $table->timestamps();
        });

        Schema::create('top_languages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('percent');
            $table->string('color')->nullable();
            $table->timestamps();
        });

        Schema::create('tools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon');
            $table->string('desc');
            $table->string('descEn')->nullable();
            $table->timestamps();
        });

        Schema::create('learning_goals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('status');
            $table->string('statusEn')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('education');
        Schema::dropIfExists('social_media');
        Schema::dropIfExists('dashboard_stats');
        Schema::dropIfExists('top_languages');
        Schema::dropIfExists('tools');
        Schema::dropIfExists('learning_goals');
    }
};
