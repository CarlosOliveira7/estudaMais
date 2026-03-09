<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//ROTAS DASHBOARD E GRUPOS
Route::get('/dashboard', [GroupController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/dashboard/{group}/show', [GroupController::class, 'show'])->
middleware(['auth','verified'])->name('groups.show');


//ROTAS DO CHAT DO GRUPO

Route::get('/chat/{group}', [MessageController::class, 'index'])->middleware(['auth','verified'])->name('message.chat');
Route::post('/chat/{group}/send', [MessageController::class, 'store'])->name('message.store');



//ROTAS DO PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
