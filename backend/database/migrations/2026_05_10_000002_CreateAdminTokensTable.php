<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('AdminTokens', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('admin_user_id')->constrained('AdminUsers')->cascadeOnDelete();
            $table->string('name')->default('spa');
            $table->string('token_hash', 64)->unique();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('AdminTokens');
    }
};
