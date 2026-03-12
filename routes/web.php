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










//ROTAS DO PROFILE
Route::middleware('auth')->group(function () {


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    //ROTAS DASHBOARD E GRUPOS
    Route::get('/dashboard', [GroupController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/{group}/show', [GroupController::class, 'show'])->name('groups.show');

    //ROTAS DE MEMBROS
    Route::get('/dashboard/{group}/members', [GroupUserController::class ,'index'])->name('group.members');
    Route::get('/dashboard/group/create', [GroupController::class, 'create'])->name('group.create');
    Route::post('/dashboard/group/store', [GroupController::class, 'store'])->name('group.store');
    //ROTAS DO CHAT DO GRUPO

    Route::get('/chat/{group}', [MessageController::class, 'index'])->name('message.chat');
    Route::post('/chat/{group}/send', [MessageController::class, 'store'])->name('message.store');
});

require __DIR__.'/auth.php';
