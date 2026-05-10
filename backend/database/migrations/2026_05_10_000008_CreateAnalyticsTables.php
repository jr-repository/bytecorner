<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('AnalyticsSessions', function (Blueprint $table): void {
            $table->id();
            $table->string('session_id')->unique();
            $table->string('visitor_id')->index();
            $table->string('ip_hash', 64)->nullable()->index();
            $table->text('user_agent')->nullable();
            $table->string('device')->nullable()->index();
            $table->string('browser')->nullable()->index();
            $table->string('os')->nullable()->index();
            $table->string('country')->nullable()->index();
            $table->string('city')->nullable()->index();
            $table->text('referrer')->nullable();
            $table->string('source')->nullable()->index();
            $table->string('medium')->nullable()->index();
            $table->string('campaign')->nullable()->index();
            $table->text('landing_page')->nullable();
            $table->timestamp('started_at')->index();
            $table->timestamp('last_seen_at')->nullable()->index();
            $table->unsignedInteger('page_view_count')->default(0);
            $table->unsignedInteger('event_count')->default(0);
            $table->boolean('is_returning')->default(false)->index();
            $table->timestamps();
        });

        Schema::create('AnalyticsPageViews', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('analytics_session_id')->constrained('AnalyticsSessions')->cascadeOnDelete();
            $table->string('session_id')->index();
            $table->string('visitor_id')->index();
            $table->string('ip_hash', 64)->nullable()->index();
            $table->text('full_url');
            $table->string('path')->index();
            $table->text('query_string')->nullable();
            $table->text('title')->nullable();
            $table->text('referrer')->nullable();
            $table->string('source')->nullable()->index();
            $table->string('medium')->nullable()->index();
            $table->string('campaign')->nullable()->index();
            $table->string('utm_content')->nullable()->index();
            $table->string('utm_term')->nullable()->index();
            $table->string('country')->nullable()->index();
            $table->string('city')->nullable()->index();
            $table->string('device')->nullable()->index();
            $table->string('browser')->nullable()->index();
            $table->string('os')->nullable()->index();
            $table->unsignedInteger('duration_seconds')->nullable();
            $table->boolean('is_exit')->default(false)->index();
            $table->timestamp('viewed_at')->index();
            $table->timestamps();
        });

        Schema::create('AnalyticsEvents', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('analytics_session_id')->nullable()->constrained('AnalyticsSessions')->nullOnDelete();
            $table->string('session_id')->nullable()->index();
            $table->string('visitor_id')->nullable()->index();
            $table->string('event_type')->index();
            $table->string('event_name')->nullable()->index();
            $table->text('label')->nullable();
            $table->text('target_url')->nullable();
            $table->string('path')->nullable()->index();
            $table->json('metadata')->nullable();
            $table->timestamp('occurred_at')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('AnalyticsEvents');
        Schema::dropIfExists('AnalyticsPageViews');
        Schema::dropIfExists('AnalyticsSessions');
    }
};
