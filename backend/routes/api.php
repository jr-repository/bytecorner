<?php

use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\ArticleController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\ClientLogoController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\MediaController;
use App\Http\Controllers\Api\Admin\PortfolioController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Public\PublicContentController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

Route::get('services', [PublicContentController::class, 'services']);
Route::get('services/{slug}', [PublicContentController::class, 'service']);
Route::get('portfolio', [PublicContentController::class, 'portfolio']);
Route::get('portfolio/{slug}', [PublicContentController::class, 'portfolioItem']);
Route::get('articles', [PublicContentController::class, 'articles']);
Route::get('articles/{slug}', [PublicContentController::class, 'article']);
Route::get('client-logos', [PublicContentController::class, 'logos']);
Route::get('stats', [PublicContentController::class, 'stats']);

Route::middleware('admin.token')->prefix('admin')->group(function (): void {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('profile', [AuthController::class, 'updateProfile']);
    Route::post('profile/photo', [AuthController::class, 'updatePhoto']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('dashboard', DashboardController::class);

    Route::apiResource('services', ServiceController::class)->parameters(['services' => 'service']);
    Route::apiResource('portfolio', PortfolioController::class)->parameters(['portfolio' => 'portfolio']);
    Route::apiResource('articles', ArticleController::class)->parameters(['articles' => 'article']);
    Route::apiResource('client-logos', ClientLogoController::class)->parameters(['client-logos' => 'clientLogo']);
    Route::apiResource('users', AdminUserController::class)->parameters(['users' => 'adminUser']);
    Route::apiResource('media', MediaController::class)->only(['index', 'store', 'destroy'])->parameters(['media' => 'mediaItem']);
});
