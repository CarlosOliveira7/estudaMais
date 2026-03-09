import PrimaryButton from '@/Components/PrimaryButton';
import React, { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
export default function GroupChat({ group, messages: initialMessages }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
        group_id: group.id,
    });

    const submit = (e) => {
        e.preventDefault();
        //console.log(group.id,data.message);
        post(route('message.store', {group: group.id}), {
            
            onSuccess: () => reset('message'), 
        });
    };

    const [allMessages, setAllMessages] = useState(initialMessages);

    useEffect(() => {
        if (typeof window.Echo !== 'undefined') {
            const channel = window.Echo.private(`groups.${group.id}`)
                .listen('MessageSent', (e) => {

                    setAllMessages((prev) => [...prev, e.message]);
                });


            return () => {
                window.Echo.leave(`groups.${group.id}`);
            };
        }
    }, [group.id]);

    return (
        <div className="chat-container">
            <h2>Chat do grupo: {group.name}</h2>
            <div className="messages-list bg-red-600">
                {allMessages.map((msg) => (
                    <div key={msg.id} className="message">
                        <strong>{msg.user.name}:</strong> {msg.content}
                    </div>
                ))}
            </div>


            <div className="m-6">
                <form onSubmit={submit}>
                    <TextInput
                        className='rounded-md'
                        type="text"
                        name="message"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder='Digite sua mensagem...'
                    />

                    
                    {errors.message && <div className="text-red-500">{errors.message}</div>}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        {processing ? 'Enviando...' : 'Enviar'}
                    </PrimaryButton>
                </form>
            </div>

        </div>
    );
}