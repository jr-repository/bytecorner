<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Portfolio', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('client');
            $table->string('category')->index();
            $table->string('title_id');
            $table->string('title_en');
            $table->text('description_id')->nullable();
            $table->text('description_en')->nullable();
            $table->longText('overview_id')->nullable();
            $table->longText('overview_en')->nullable();
            $table->longText('challenge_id')->nullable();
            $table->longText('challenge_en')->nullable();
            $table->longText('solution_id')->nullable();
            $table->longText('solution_en')->nullable();
            $table->json('tech_stack')->nullable();
            $table->date('project_date')->nullable();
            $table->text('project_url')->nullable();
            $table->text('preview_url')->nullable();
            $table->text('main_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('metrics')->nullable();
            $table->enum('status', ['published', 'draft'])->default('draft')->index();
            $table->boolean('featured')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Portfolio');
    }
};
