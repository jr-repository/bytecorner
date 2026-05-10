<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Services', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('category')->index();
            $table->string('title_id');
            $table->string('title_en');
            $table->text('excerpt_id')->nullable();
            $table->text('excerpt_en')->nullable();
            $table->longText('description_id')->nullable();
            $table->longText('description_en')->nullable();
            $table->string('icon')->default('Sparkles');
            $table->text('main_image')->nullable();
            $table->json('features')->nullable();
            $table->json('faq')->nullable();
            $table->json('cta')->nullable();
            $table->enum('status', ['published', 'draft'])->default('draft')->index();
            $table->boolean('featured')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Services');
    }
};
