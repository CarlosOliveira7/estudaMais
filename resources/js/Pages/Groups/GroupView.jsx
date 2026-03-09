import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
export default function GroupView({ auth, group }) {
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
                                    {group.topics.map((topic) => (
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
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Espaço para futuras abas: Materiais, Chat, Membros */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition">
                            📚 Materiais
                        </div>
                        <Link
                            href={route('message.chat', group.id)}
                            className="inline-block px-4 py-2 bg-[#0f0f1e] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-800 transition ease-in-out duration-150 text-center"
                        >
                            Chat do Grupo
                        </Link>
                        <div className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition">
                            👥 Membros
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}