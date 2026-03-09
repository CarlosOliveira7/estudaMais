<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Group;
use App\Models\Topic;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

    $topics = Topic::factory(10)->create();

 
    $user = User::factory()->create([
        'name' => 'Carlos Admin',
        'email' => 'carlos@teste.com',
    ]);

    Group::factory(5)->create([
        'user_id' => $user->id
    ])->each(function ($group) use ($topics) {
        
        $group->topics()->attach(
            $topics->random(rand(1, 3))->pluck('id')->toArray()
        );
    });
       
    }
}
