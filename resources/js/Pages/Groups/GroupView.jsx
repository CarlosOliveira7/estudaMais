import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function GroupView({ auth, group,can }) {
    const [showMembers, setShowMembers] = useState(false);
    const [showLink, setShowLink] = useState(false);

    const members = group.members || [];
    

    const { user } = auth;
    console.log(user);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-50">
                    {group.name}
                </h2>
            }
        >
            <Head title={`Grupo - ${group.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold">Sobre o grupo</h3>
                                <p className="mt-2 text-gray-600">
                                    {group.description || 'Nenhuma descrição fornecida.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {group.topics?.map((topic) => (
                                        <span key={topic.id} className='px-2 py-1 bg-fuchsia-700 text-white text-[10px] font-bold uppercase rounded-md'>
                                            {topic.name}
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Código de Convite:</span>
                                    <code className="ml-2 bg-gray-100 p-1 rounded text-red-600 font-mono">
                                        {group.invite_code}
                                    </code>
                                    <Link
                                        onClick={() => setShowLink(!showLink)}
                                        className="bg-slate-400 mx-2 text-white-50 p-4 rounded-lg shadow cursor-pointer hover:bg-slate-950 transition hover:text-white inline-block"
                                        href={route('group.gerenateLink', group.id)}
                                    >
                                        Gerar link de Convite
                                    </Link>
                                </div>


                            </div>

                            <div>
                                <div>
                                    {can.delete ? (<Link
                                        href={route('group.delete', group.id)}
                                        method="delete"
                                        as="button"
                                        onBefore={() => confirm('Você tem certeza que deseja apagar esse grupo? (Essa ação não poderá ser desfeita)')}
                                    >
                                        Deletar Grupo
                                    </Link>) : (null) }
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition">
                            📚 Materiais
                        </div>
                        <Link
                            href={route('message.chat', group.id)}
                            className="inline-block p-4 bg-white border border-transparent rounded-md text-base tracking-widest hover:bg-indigo-200 transition ease-in-out duration-150 text-center shadow"
                        >
                            💬 Chat do Grupo
                        </Link>

                        {/* CORREÇÃO AQUI: Removido o href e mantido apenas o toggle do estado */}
                        <div
                            onClick={() => setShowMembers(!showMembers)}
                            className={`p-4 rounded-lg shadow cursor-pointer transition ${showMembers ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            👥 Membros
                        </div>
                    </div>

                    {showMembers && (
                        <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg animate-fade-in">
                            <div className="p-6 text-gray-900 border-b border-gray-200">
                                <h3 className="text-lg font-bold mb-4">Membros do Grupo</h3>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 rounded-tl-lg">Nome</th>
                                                <th scope="col" className="px-6 py-3">Email</th>
                                                <th scope="col" className="px-6 py-3 rounded-tr-lg">Função</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.length > 0 ? (
                                                members.map((member) => (
                                                    <tr key={member.id} className="bg-white border-b hover:bg-gray-50">
                                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                                {member.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            {member.name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {member.email}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                                {member.pivot?.role}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                                        Nenhum membro encontrado.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}