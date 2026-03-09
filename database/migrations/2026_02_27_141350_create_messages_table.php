<?php

use App\Models\User;
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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            // Quem enviou? (Relacionado à tabela users)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Em qual grupo? (Relacionado à tabela groups)
            $table->foreignId('group_id')->constrained()->onDelete('cascade');

            // O que foi dito?
            $table->text('content');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
