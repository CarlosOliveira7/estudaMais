<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[UsePolicy(GroupPolicy::class)]
class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    protected $guarded = [];


    public function members()
    {
        return $this->belongsToMany(User::class)->withPivot('role');
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class);
    }
}
