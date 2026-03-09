<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /** @use HasFactory<\Database\Factories\MessageFactory> */
    use HasFactory;


    protected $guarded = [];

    // A mensagem pertence a um usuário
    public function user() {
        return $this->belongsTo(User::class);
    }

    // A mensagem pertence a um grupo
    public function group() {
        return $this->belongsTo(Group::class);
    }
}
