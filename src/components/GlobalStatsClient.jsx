"use client";

import {useEffect, useState} from "react";
import {getGlobalStats} from "@/lib/flashcardService";

const areaConfig = {
    civile: {
        name: "Diritto Civile",
        icon: "⚖️",
        color: "from-amber-400 via-amber-500 to-orange-500",
        bgColor: "from-amber-400 via-amber-500 to-orange-500",
        textColor: "text-white",
        borderColor: "border-amber-300",
    },
    amministrativo: {
        name: "Diritto Amministrativo",
        icon: "🏛️",
        color: "from-blue-400 via-blue-500 to-indigo-500",
        bgColor: "from-blue-400 via-blue-500 to-indigo-500",
        textColor: "text-white",
        borderColor: "border-blue-300",
    },
    penale: {
        name: "Diritto Penale",
        icon: "⚔️",
        color: "from-emerald-400 via-green-500 to-teal-500",
        bgColor: "from-emerald-400 via-green-500 to-teal-500",
        textColor: "text-white",
        borderColor: "border-green-300",
    },
};

export default function GlobalStatsClient() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGlobalStats().then((result) => {
            setStats(result);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div
                className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600 font-medium">Caricamento statistiche...</p>
                </div>
            </div>
        );
    }

    // Totali globali coerenti con getAreaStats(): totalCards, studiedCards, neverStudiedCards, totalStudies, totalCorrect, accuracy
    const globalTotals = Object.values(stats || {}).reduce(
        (acc, areaStats) => ({
            totalCards: acc.totalCards + (areaStats.totalCards || 0),
            studiedCards: acc.studiedCards + (areaStats.studiedCards || 0),
            neverStudiedCards: acc.neverStudiedCards + (areaStats.neverStudiedCards || 0),
            totalStudies: acc.totalStudies + (areaStats.totalStudies || 0),
            totalCorrect: acc.totalCorrect + (areaStats.totalCorrect || 0),
        }),
        {totalCards: 0, studiedCards: 0, neverStudiedCards: 0, totalStudies: 0, totalCorrect: 0}
    );

    const globalAccuracy = globalTotals.totalStudies > 0 ? ((globalTotals.totalCorrect / globalTotals.totalStudies) * 100).toFixed(1) : 0;
    const globalCorrect = globalTotals.totalCorrect;
    const globalWrong = Math.max(0, globalTotals.totalStudies - globalTotals.totalCorrect);
    const globalStudiesPerCard = globalTotals.totalCards > 0 ? (globalTotals.totalStudies / globalTotals.totalCards).toFixed(2) : 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition-all duration-200 hover:gap-3"
                    >
            <span className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
                        <span>Torna alla Home</span>
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-6xl md:text-7xl font-extrabold bg-linear-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
                        Dashboard Statistiche
                    </h1>
                    <p className="text-2xl text-gray-600">Panoramica completa del tuo progresso nello studio</p>
                </div>

                {/* Metriche Globali */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-blue-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Flashcard Totali</div>
                        <div className="text-3xl font-bold text-blue-600">{globalTotals.totalCards}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-teal-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Studiate</div>
                        <div className="text-3xl font-bold text-teal-600">{globalTotals.studiedCards}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-amber-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Mai studiate</div>
                        <div className="text-3xl font-bold text-amber-600">{globalTotals.neverStudiedCards}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-green-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Risposte corrette</div>
                        <div className="text-3xl font-bold text-green-600">{globalCorrect}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-red-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Risposte errate</div>
                        <div className="text-3xl font-bold text-red-600">{globalWrong}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-purple-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Tentativi</div>
                        <div className="text-3xl font-bold text-purple-600">{globalTotals.totalStudies}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-sky-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Studi per carta</div>
                        <div className="text-3xl font-bold text-sky-600">{globalStudiesPerCard}</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-b-4 border-indigo-500">
                        <div className="text-sm font-medium text-gray-500 mb-1">Precisione</div>
                        <div className="text-3xl font-bold text-indigo-600">{globalAccuracy}%</div>
                    </div>
                </div>

                {/* Tabella Comparativa Aree */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900">Confronto per Area</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Area
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Totali
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Studiate
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mai studiate
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Risposte corrette
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Risposte errate
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tentativi
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Precisione
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Progresso
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(stats ?? {}).map(([areaKey, areaStatsRaw]) => {
                                const areaStats = areaStatsRaw ?? {};
                                const config = areaConfig[areaKey];
                                const totalCorrect = Number(areaStats.totalCorrect ?? 0);
                                const totalStudies = Number(areaStats.totalStudies ?? 0);
                                const studiedCards = Number(areaStats.studiedCards ?? 0);
                                const totalCards = Number(areaStats.totalCards ?? 0);
                                const neverStudiedCards = Number(areaStats.neverStudiedCards ?? 0);
                                const accuracy = Number(areaStats.accuracy ?? 0);
                                const wrong = Math.max(0, totalStudies - totalCorrect);
                                const progress = totalCards > 0 ? Math.min(100, Math.round((studiedCards / totalCards) * 100)) : 0;

                                return (
                                    <tr key={areaKey} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                                            <span className="text-xl">{config?.icon}</span>
                                            {config?.name ?? areaKey}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-blue-600 font-bold">
                                            {totalCards}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-teal-600 font-bold">
                                            {studiedCards}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-amber-600 font-bold">
                                            {neverStudiedCards}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-bold">
                                            {totalCorrect}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-bold">
                                            {wrong}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-sky-600 font-bold">
                                            {totalStudies}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-indigo-600 font-bold">
                                            {accuracy}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div className={`h-3 rounded-full bg-linear-to-r ${config?.color ?? ""}`}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card Dettagliate per Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(stats || {}).map(([areaKey, areaStats]) => {
                        const config = areaConfig[areaKey];

                        if (!config) return null;

                        const progress = areaStats.totalCards > 0 ? (((areaStats.studiedCards || 0) / areaStats.totalCards) * 100).toFixed(0) : 0;
                        const correct = areaStats.totalCorrect || 0;
                        const wrong = Math.max(0, (areaStats.totalStudies || 0) - correct);

                        return (
                            <div key={areaKey} className={`bg-white rounded-xl shadow-sm border ${config.borderColor} overflow-hidden hover:shadow-md transition-shadow`}>
                                <div className={`bg-linear-to-r ${config.bgColor} px-6 py-4 border-b ${config.borderColor}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{config.icon}</span>
                                        <h3 className={`text-lg font-bold ${config.textColor}`}>{config.name}</h3>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600 font-medium">Completamento</span>
                                            <span className="font-bold text-gray-900">{progress}%</span>
                                        </div>
                                        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div className={`h-full bg-linear-to-r ${config.color} transition-all duration-500`} style={{width: `${progress}%`}}></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Flashcard</div>
                                            <div className="text-xl font-bold text-blue-600">{areaStats.totalCards || 0}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Studiate</div>
                                            <div className="text-xl font-bold text-teal-600">{areaStats.studiedCards || 0}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Mai studiate</div>
                                            <div className="text-xl font-bold text-amber-600">{areaStats.neverStudiedCards || 0}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Precisione</div>
                                            <div className={`text-xl font-bold ${
                                                    (areaStats.accuracy || 0) >= 80
                                                        ? "text-green-600"
                                                        : (areaStats.accuracy || 0) >= 60
                                                            ? "text-orange-500"
                                                            : "text-red-600"
                                                }`}
                                            >
                                                {(areaStats.accuracy || 0)}%
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Risposte corrette</div>
                                            <div className="text-xl font-bold text-green-600">{correct}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-gray-500 mb-1">Risposte errate</div>
                                            <div className="text-xl font-bold text-red-600">{wrong}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
