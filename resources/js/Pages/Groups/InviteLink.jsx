
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {usePage} from '@inertiajs/react';
export default function ({group,auth}) {

    return (
        <GuestLayout>
            

            <div>
            {auth.user ? (
                <div>
                <div className="relative flex flex-col my-4 bg-gray-900 shadow-sm border border-slate-200 rounded-lg w-96">
                    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                    </div>
                    <div className="p-4">
                        <h6 className="mb-2 text-white text-xl font-semibold uppercase">
                            você está sendo convidado a juntar-se ao grupo <strong>{group.name}</strong>
                        </h6>
                        <p className="text-white leading-normal font-light">
                            {group.description}
                        </p>
                    </div>

                    <div>
                        <h2 className='mx-3'>Tópicos do Grupo:</h2>
                        <div className="flex flex-wrap gap-2 m-3">
                                    {group.topics.map((topic) => (
                                        <span key={topic.id} className='px-2 py-1  bg-fuchsia-700 text-white text-[10px] font-bold uppercase rounded-md'>
                                            {topic.name}
                                        </span>
                                    ))}
                                </div>
                    </div>
                    <div className="px-4 pb-4 pt-0 mt-2">
                        <Link 
                                href={route('member.enter', group.id)} 
                                method="post" 
                                as="button"
                                className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Juntar-se ao Grupo
                            </Link>
                    </div>
                </div>
            </div>
            ) : (
                <div>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>
                </div>
            )}
        </div>
        </GuestLayout>
    );

}