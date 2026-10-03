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
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('role');
            $table->string('company');
            $table->string('location');
            $table->string('logo')->nullable();
            $table->string('period');
            $table->string('duration');
            $table->string('type');
            $table->string('typeEn')->nullable();
            $table->string('work_mode');
            $table->json('responsibilities')->nullable();
            $table->json('responsibilitiesEn')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
