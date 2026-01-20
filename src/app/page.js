'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { countFlashcardsByArea } from '@/lib/flashcardService';
import Image from 'next/image';

export default function Home() {
    const [counts, setCounts] = useState({
        civile: 0,
        amministrativo: 0,
        penale: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const areas = [
        {
            id: 'civile',
            title: 'Diritto Civile',
            description: 'Studia i principi del diritto civile',
            icon: '/balance.png',
            gradient: 'from-amber-400 via-amber-500 to-orange-500',
            hoverGradient: 'hover:from-amber-500 hover:via-amber-600 hover:to-orange-600',
        },
        {
            id: 'amministrativo',
            title: 'Diritto Amministrativo',
            description: 'Approfondisci il diritto amministrativo',
            icon: '/court.png',
            gradient: 'from-blue-400 via-blue-500 to-indigo-500',
            hoverGradient: 'hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600',
        },
        {
            id: 'penale',
            title: 'Diritto Penale',
            description: 'Esplora il diritto penale',
            icon: '/gavel.png',
            gradient: 'from-emerald-400 via-green-500 to-teal-500',
            hoverGradient: 'hover:from-emerald-500 hover:via-green-600 hover:to-teal-600',
        }
    ];

    const globalStatsCard = {
        id: 'global-stats',
        title: 'Statistiche Globali',
        description: 'Visualizza le statistiche di tutte le aree',
        icon: '/globe.svg',
        link: '/global-stats'
    };

    useEffect(() => {
        loadCounts();
    }, []);

    const loadCounts = async () => {
        try {
            setIsLoading(true);
            const [civile, amministrativo, penale] = await Promise.all([
                countFlashcardsByArea('civile'),
                countFlashcardsByArea('amministrativo'),
                countFlashcardsByArea('penale')
            ]);
            setCounts({ civile, amministrativo, penale });
        } catch (error) {
            console.error('Errore:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const totalCards = counts.civile + counts.amministrativo + counts.penale;

    const stats = [
        { id: 'total-cards', value: totalCards, label: 'Flashcards Totali' },
        { id: 'total-areas', value: areas.length, label: 'Aree di Studio' },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Pattern di sfondo decorativo */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Hero Section migliorata */}
                <header className="text-center mb-16 animate-fade-in">
                    <div className="inline-block mb-4">
                        <span className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            Piattaforma di Studio Giuridico
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-extrabold bg-linear-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                        Flashcards Giuridiche
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Potenzia il tuo apprendimento con flashcards interattive
                    </p>

                    {/* Statistiche totali */}
                    {!isLoading && totalCards > 0 && (
                    <section className="flex justify-center gap-8 mb-8" aria-label="Statistiche principali">
                        {stats.map(({ id, value, label }) => (
                            <div key={id} className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20" role="status" aria-live="polite">
                                <div className="text-3xl font-bold text-sky-700">
                                    {value}
                                </div>
                                <div className="text-md text-gray-700">{label}</div>
                            </div>
                        ))}
                    </section>
                    )}
                </header>

                {/* Griglia delle card migliorata */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {areas.map((area, index) => (
                        <Link key={area.id} href={`/area/${area.id}`}>
                            <div className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
                                {/* Effetto glow su hover */}
                                <div className={`absolute -inset-0.5 bg-linear-to-r ${area.gradient} rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>

                                {/* Card principale */}
                                <div className={`relative bg-linear-to-br ${area.gradient} ${area.hoverGradient} rounded-3xl shadow-xl p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 min-h-95 flex flex-col justify-between backdrop-blur-sm`}>

                                    {/* Badge con conteggio migliorato */}
                                    {!isLoading && counts[area.id] > 0 && (
                                        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 group-hover:scale-110 transition-transform">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                            {counts[area.id]} cards
                                        </div>
                                    )}

                                    <div className="text-center flex-1 flex flex-col justify-center">
                                        {/* Icona con animazione */}
                                        <div className="flex justify-center items-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl shadow-lg">
                                                <Image
                                                    src={area.icon}
                                                    alt={area.title + ' icon'}
                                                    width={80}
                                                    height={80}
                                                    className="drop-shadow-2xl"
                                                />
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                            {area.title}
                                        </h2>
                                        <p className="text-white/95 text-lg leading-relaxed drop-shadow">
                                            {area.description}
                                        </p>
                                    </div>

                                    {/* Call to action */}
                                    <div className="mt-6 text-center">
                                        <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                                            Inizia a studiare
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Statistiche Globali (stile minimale) */}
                <div className="flex justify-center mt-16">
                    <Link
                        href={globalStatsCard.link}
                        aria-label={globalStatsCard.title}
                        className={`group w-full max-w-2xl
                            ${isLoading ? 'pointer-events-none opacity-60' : ''}
                        `}
                    >
                        <div className="relative rounded-2xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus-within:ring-4 focus-within:ring-indigo-300/40">
                            <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                                <div className="min-w-0 flex items-center gap-4">
                                    <div className="shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 p-3">
                                        <Image
                                            src={globalStatsCard.icon}
                                            alt=""
                                            width={22}
                                            height={22}
                                            className="opacity-90"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            Statistiche Globali
                                        </h3>
                                        <p className="text-sm text-gray-600 truncate">
                                            {globalStatsCard.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="shrink-0 flex items-center gap-3 text-gray-500">
                                    <span className="hidden sm:inline text-sm">Apri</span>
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Sezione informativa aggiuntiva */}
                <div className="mt-16 text-center max-w-5xl mx-auto">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                        <h3 className="text-2xl font-bold text-gray-800 mb-12">
                            💡 Come funziona?
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div className="flex gap-3">
                                <div className="shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Scegli l&#39;area</h4>
                                    <p className="text-md text-gray-600">Seleziona l&#39;ambito giuridico che vuoi studiare</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Studia le card</h4>
                                    <p className="text-md text-gray-600">Gira le flashcards per testare le tue conoscenze</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Progredisci</h4>
                                    <p className="text-md text-gray-600">Migliora gradualmente la tua preparazione</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
