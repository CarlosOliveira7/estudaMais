import PrimaryButton from '@/Components/PrimaryButton';
import React, { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
// IMPORTANTE: Adicione o usePage aqui no import
import { useForm, usePage } from '@inertiajs/react'; 

export default function GroupChat({ group, messages: initialMessages }) {
    
    // 1. Pega os dados do usuário logado globalmente pelo Inertia
    const { auth } = usePage().props; 
    const currentUser = auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        group_id: group.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('message.store', { group: group.id }), {
            onSuccess: () => reset('content'),
        });
    };

    const [allMessages, setAllMessages] = useState(initialMessages);

    useEffect(() => {
        if (typeof window.Echo !== 'undefined') {
            const channel = window.Echo.private(`groups.${group.id}`)
                // ADICIONE UM PONTO ANTES DO NOME AQUI:
                .listen('.MessageSent', (e) => { 
                    console.log("MENSAGEM RECEBIDA VIA WEBSOCKET:", e); // <-- Vamos debugar!
                    setAllMessages((prev) => [...prev, e.message]);
                });

            return () => {
                window.Echo.leave(`groups.${group.id}`);
            };
        }
    }, [group.id]);

    useEffect(() => {
        setAllMessages(initialMessages);
    }, [initialMessages]);

    return (
        <div>
            <div className="chat-container">
                <h2 className="p-4 text-xl font-bold border-b">Chat do grupo: {group.name}</h2>

                {/* Adicionei um padding e um flex-col para a lista ficar organizada */}
                <div className="messages-list flex flex-col p-6 overflow-y-auto max-h-[60vh]">
                    
                    {allMessages.map((msg) => {
                        // 2. Verifica se a mensagem é minha
                        const isMine = msg.user.id === currentUser.id;

                        return (
                            <div 
                                key={msg.id} 
                                // 3. Se for minha vai pra direita (justify-end), se não, esquerda (justify-start)
                                className={`flex mb-4 ${isMine ? 'justify-end' : 'justify-start'}`}
                            >
                                <div 
                                    // 4. Se for minha é Indigo/Branco, se for do outro é Cinza Claro/Escuro
                                    className={`flex flex-col max-w-[70%] rounded-lg p-3 ${
                                        isMine 
                                        ? 'bg-indigo-500 text-white rounded-br-none' 
                                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                                    }`}
                                >
                                    {/* Mostra o nome bem pequeno em cima da mensagem (opcional) */}
                                    <span className={`text-[10px] mb-1 font-bold ${isMine ? 'text-indigo-200' : 'text-gray-500'}`}>
                                        {isMine ? 'Você' : msg.user.name}
                                    </span>
                                    
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

            <div className="chat-container border-t">
                <div className="m-6">
                    <form onSubmit={submit} className="flex gap-2"> {/* flex aqui para o botão ficar do lado do input */}
                        <div className="flex-1">
                            <TextInput
                                className='w-full rounded-md'
                                type="text"
                                name="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder='Digite sua mensagem...'
                            />
                            {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                        </div>
                        
                        <PrimaryButton disabled={processing} className="h-[42px]">
                            {processing ? '...' : 'Enviar'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}