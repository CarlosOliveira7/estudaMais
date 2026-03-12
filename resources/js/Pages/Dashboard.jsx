import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
export default function Dashboard({ auth, groups }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-4xl font-semibold leading-tight text-gray-50">
                    Meus Grupos
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link
                    className='inline-block mb-4 p-4 bg-[white] border border-transparent rounded-md  text-base  tracking-widest hover:bg-indigo-200 transition ease-in-out duration-150 text-center font-bold' 
                    href={route('group.create')}>
                        Criar Grupo
                    </Link>
                    {groups && groups.length > 0 ? (
                        groups.map((group) => (
                            <div key={group.id} className="p-6 text-gray-900 bg-slate-400 shadow-sm sm:rounded-lg mb-4 flex flex-col gap-3">
                                {/* Título do Grupo */}
                                <h3 className="text-3xl font-bold border-b border-slate-500 pb-2">
                                    {group.name}
                                </h3>

                                <p>
                                    {group.description}
                                </p>
                                {/* Seção de Tópicos */}
                                <div>
                                    <p className='font-bold text-md uppercase mb-1'>Tópicos:</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                    {group.topics.map((topic) => (
                                        <span key={topic.id} className='px-2 py-1 bg-fuchsia-700 text-white text-[10px] font-bold uppercase rounded-md'>
                                            {topic.name}
                                        </span>
                                    ))}
                                </div>
                                </div>

                                {/* Botão Visualizar Grupo*/}
                                <div className="mt-2">
                                    <Link
                                        href={route('groups.show', group.id)}
                                        className="inline-block px-4 py-2 bg-[#0f0f1e] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-800 transition ease-in-out duration-150 text-center"
                                    >
                                        Visualizar Grupo
                                    </Link>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="p-6 text-gray-400 bg-white shadow-sm sm:rounded-lg">
                            Nenhum grupo encontrado.
                        </div>
                    )}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
