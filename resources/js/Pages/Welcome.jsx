import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {

    const colors = {
        primary: 'bg-blue-600', 
        primaryHover: 'hover:bg-blue-700',
        secondary: 'bg-black', 
        secondaryHover: 'hover:bg-slate-900',
    };

    return (
        <>
            <Head title="Bem-vindo ao estudaMais2" />
            
            
            <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200">
                
                
                <header className="border-b border-slate-100 dark:border-slate-800">
                    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        
                        <div className="flex items-center gap-3">
                           
                            <div className={`${colors.primary} p-2 rounded-xl text-white shadow-md shadow-blue-500/10`}>
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                                estuda<span className="text-blue-600">Mais</span><span className="font-light text-slate-400"></span>
                            </span>
                        </div>

                        {/* Navegação/Login */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className={`px-5 py-2.5 rounded-xl font-semibold text-white ${colors.primary} ${colors.primaryHover} transition duration-150 shadow-md shadow-blue-500/20`}
                                >
                                    Ir para Meus Grupos
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-5 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition duration-150"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className={`px-5 py-2.5 rounded-xl font-semibold text-white ${colors.secondary} ${colors.secondaryHover} transition duration-150 shadow-md shadow-black/10`}
                                    >
                                        Criar Conta Grátis
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Conteúdo Principal (Hero e Features) */}
                <main className="max-w-7xl mx-auto px-6 py-20 md:py-32">
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        
                        {/* Seção Hero (Texto) */}
                        <div className="md:col-span-7 space-y-8">
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 dark:text-white">
                                Colaboração real para o <span className="text-blue-600">seu aprendizado.</span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                                O <strong className="font-semibold text-slate-800 dark:text-slate-100">estudaMais2</strong> é a plataforma onde grupos de estudos fechados se conectam. Compartilhe conhecimento, tire dúvidas e evolua em tempo real com colegas focados nos mesmos objetivos.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href={route('register')} className={`px-8 py-4 ${colors.secondary} ${colors.secondaryHover} text-white rounded-xl font-bold text-lg text-center transition duration-150 shadow-lg shadow-black/10 hover:-translate-y-0.5`}>
                                    Começar Agora
                                </Link>
                                <button className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition duration-150">
                                    Saiba mais
                                </button>
                            </div>
                        </div>

                        
                        <div className="md:col-span-5 hidden md:block relative">
                            
                        </div>
                    </div>

                    
                    <div className="mt-24 md:mt-32 grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="⚡"
                            title="Comunicação em Tempo Real"
                            description="Envie e receba mensagens instantaneamente com a tecnologia Pusher/WebSocket configurada."
                        />
                        <FeatureCard 
                            icon="🔒"
                            title="Grupos Fechados e Seguros"
                            description="Acesso validado (/broadcasting/auth). Apenas membros autorizados podem ler as mensagens."
                        />
                        <FeatureCard 
                            icon="📋"
                            title="Organização Focada"
                            description="Cada grupo tem seu espaço dedicado, acessível via ID na URL, mantendo as conversas organizadas."
                        />
                    </div>
                </main>

               
                
            </div>
        </>
    );
}

// Componente simples para os cards de destaque
function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="text-4xl mb-6">{icon}</div>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">{description}</p>
        </div>
    );
}