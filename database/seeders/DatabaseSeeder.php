<?php

namespace Database\Seeders;

use App\Models\User;
// Removi o WithoutModelEvents para os eventos de criação rodarem normalmente, mas pode deixar se preferir.
use Illuminate\Database\Seeder; 
use App\Models\Group;
use App\Models\Topic;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {


    $topics = Topic::factory(10)->create();

    // 2. Criar os usuários base
    $user1 = User::factory()->create([
        'name' => 'Carlos Admin 1',
        'email' => 'carlos@teste.com',
        'password' => bcrypt('password'),
    ]);

    $user2 = User::factory()->create([
        'name' => 'Carlos Admin 2',
        'email' => 'carlos@teste2.com',
        'password' => bcrypt('password'),
    ]);


    Group::factory(5)->create([
        'user_id' => $user1->id 
    ])->each(function ($group) use ($topics, $user1, $user2) {
        
        $group->topics()->attach(
            $topics->random(rand(1, 3))->pluck('id')->toArray()
        );


        $group->members()->attach([
            $user1->id => [
                'role' => 'admin',
                'joined_at' => now(),
            ],
            $user2->id => [
                'role' => 'member',
                'joined_at' => now(),
            ]
        ]);
    });
    }
}
