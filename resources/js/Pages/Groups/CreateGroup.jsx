import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from '@inertiajs/react';
import { useState } from "react";
import TextInput from '@/Components/TextInput';
import PrimaryButton from "@/Components/PrimaryButton";
export default function ({ auth }) {


    const { data, setData, post, processing, errors, reset } = useForm({
        nome: '',
        topics: [],
    });


    const submit = (e) => {
        e.preventDefault();
        post(route('group.store', { data }))
    };

    const [currentTopic, setCurrentTopic] = useState('');

    // Função para adicionar o tópico na lista
    const addTopic = (e) => {
        e.preventDefault(); // Evita que a página recarregue
        
        const trimmedTopic = currentTopic.trim();
        
        // Se não estiver vazio e ainda não existir na lista
        if (trimmedTopic && !data.topics.includes(trimmedTopic)) {
            setData('topics', [...data.topics, trimmedTopic]);
            setCurrentTopic(''); // Limpa o input
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita que o form principal seja enviado
            addTopic(e);
        }
    };

    const removeTopic = (topicToRemove) => {
        setData('topics', data.topics.filter(topic => topic !== topicToRemove));
    };
    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-2xl font-semibold leading-tight text-gray-50">
                        Criar um grupo
                    </h2>
                }
            >

                <form onSubmit={submit} className="gap-x-4">
            <div className="flex-1 my-3">
                <TextInput
                    className='w-4/5 mx-3 rounded-md'
                    type="text"
                    name="name"
                    value={data.name} 
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder='Digite o nome do Grupo...'
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div className="flex-1 my-3 mx-3">
                <div className="flex gap-2 mb-2">
                    <TextInput
                        className='w-4/5 rounded-md'
                        type="text"
                        value={currentTopic}
                        onChange={(e) => setCurrentTopic(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder='Digite um tópico....'
                    />
                    <button 
                        type="button" 
                        onClick={addTopic}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                    >
                        Adicionar
                    </button>
                </div>
                
                {/* Exibição visual das Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.topics.map((topic, index) => (
                        <span 
                            key={index} 
                            className="flex items-center gap-1 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {topic}
                            <button 
                                type="button" 
                                onClick={() => removeTopic(topic)}
                                className="text-indigo-500 hover:text-indigo-700 font-bold ml-1 focus:outline-none"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
                {errors.topics && <div className="text-red-500 text-sm mt-1">{errors.topics}</div>}
            </div>

            <div>
                <PrimaryButton disabled={processing} className="h-auto items-center justify-center content-center m-3">
                    {processing ? 'Enviando...' : 'Enviar'}
                </PrimaryButton>
            </div>
        </form>


            </AuthenticatedLayout>


        </div>

    );
}