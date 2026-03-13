<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use App\Policies\GroupPolicy;
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

        Gate::authorize('create', Group::class);
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

        $newGroup->members()->attach(auth()->id(), ['role' => 'admin']);
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

        $group->load(['members', 'topics']);

        return Inertia::render('Groups/GroupView', [
            'group' => $group,
            'members' => $group->members,
            'can' => [
            'delete' => auth()->user()->can('delete', $group),
            
            ]
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
    public function destroy(Group $group, User $user)
    {
        Gate::authorize('delete', $group);

 
        $group->delete();

        return redirect()->route('dashboard')->with('message', 'Grupo excluído com sucesso!');
    }


    public function invited($invite_code) {
        $group = Group::with('topics')->where('invite_code', $invite_code)->firstOrFail();
        $group->load('topics');
        
        return Inertia::render('Groups/InviteLink', [
            "group" => $group
        ]);
    }

    public function generateInviteLink(Group $group) {

       // $groupCode = Group::where('invite_code', '=', $request->invite_code);

        return route('member.join', ['invite_code' => $group->invite_code]);
    }

    public function inviteLink(Group $group, User $user) {
        if ($group->invite_code !== $code) {
        abort(403, 'Link de convite inválido ou expirado.'); 
    }
    
    $user = $request->user();

    if ($user) {
        
        if (!$group->users()->where('user_id', $user->id)->exists()) {

            $group->users()->attach($user->id);
        }

        return redirect()->route('groups.show', $group->id)
                         ->with('success', 'Você entrou no grupo com sucesso!');
    }
    

        return redirect()->route('login');
        
    }


    public function addMember(Group $group, User $user) {

        if (user()->auth()) {
            GroupUser::create([
                'user_id' => $user->id(),
                'group_id' => $group->id(),
                'role' => 'member'
            ]);
        }   
    }



    public function RemoveMember(Group $group, User $user) {

        if (user()->auth() && $user.role == 'admin') {
            $userRemove = GroupUser::find($user->id());
            GroupUser::delete($userRemove);
        }
    }
}