<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Models\Group;
use App\Models\Message;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Events\MessageSent;
class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Group $group)
    {

        return Inertia::render('Groups/GroupChat', [
            'group' => $group,
            'messages' => $group->messages()->with('user')->get(),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request, Group $group): RedirectResponse
    {
        dd("oi");
        $message = $group->messages()->create([
            'content' => $request->validated()['content'],
            'user_id' => auth()->id()
        ]);
        
        broadcast(new MessageSent($message))->toOthers();
        
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
