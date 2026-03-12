<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;
class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $groups = Auth::user()->ownedGroups()->with('topics')->get();

        return Inertia::render('Dashboard', [
            'groups' => $groups
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Groups/CreateGroup');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $group = DB::transaction(function () use ($request) {
        
        $request->validate([
            'name' => 'required|string|max:255',
            'topics' => 'required|array|min:1',
            'topics.*' => 'required|string|max:50',
        ]);
        $inviteCode = Str::random(10); 
        while (Group::where('invite_code', $inviteCode)->exists()) {
            $inviteCode = Str::random(10);
        }

        // Criar o Grupo
        $newGroup = Group::create([
            'name' => $request->name,
            'user_id' => auth()->id(),
            'invite_code' => $inviteCode,
        ]);

        // Processar os Tópicos
        $topicIds = [];
        foreach ($request->topics as $topicName) {
            $topicName = trim($topicName);
            if (!empty($topicName)) {
                $topic = Topic::firstOrCreate(['name' => strtolower($topicName)]);
                $topicIds[] = $topic->id;
            }
        }

        
        $newGroup->topics()->sync($topicIds);

        return $newGroup; 
        });

        return redirect()->route('dashboard')->with('success', 'Grupo criado com sucesso! Código de convite: ' . $group->invite_code);
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        // 1. Carrega os membros e os tópicos desse grupo específico
        $group->load(['members', 'topics']);

        // 2. Retorna apenas esse grupo para a página correta
        return Inertia::render('Groups/GroupView', [
            'group' => $group
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        //
    }
}
