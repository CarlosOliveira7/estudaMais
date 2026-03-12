<?php

namespace App\Http\Controllers;

use App\Models\Group_user;
use Illuminate\Http\Request;

class GroupUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Group $group)
    {
        $group_users = Group_user::where('group_id','=',$group->id);
        dd($group_users);
        return $group_users;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Group_user $group_user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group_user $group_user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group_user $group_user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group_user $group_user)
    {
        //
    }
}
