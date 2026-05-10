<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Articles', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_id');
            $table->string('title_en');
            $table->text('excerpt_id')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->longText('content_id')->nullable();
            $table->longText('content_en')->nullable();
            $table->string('category')->index();
            $table->string('author');
            $table->text('author_avatar')->nullable();
            $table->date('published_date')->nullable();
            $table->unsignedSmallInteger('reading_time')->default(3);
            $table->text('featured_image')->nullable();
            $table->json('images')->nullable();
            $table->json('tags')->nullable();
            $table->enum('status', ['published', 'draft'])->default('draft')->index();
            $table->boolean('featured')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Articles');
    }
};
