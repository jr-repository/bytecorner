<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('AnalyticsGeoLocations', function (Blueprint $table): void {
            $table->id();
            $table->string('ip_hash', 64)->unique();
            $table->string('country')->nullable()->index();
            $table->string('city')->nullable()->index();
            $table->timestamp('looked_up_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('AnalyticsGeoLocations');
    }
};
