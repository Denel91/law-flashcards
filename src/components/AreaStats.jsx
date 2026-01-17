'use client';

export default function AreaStats({ stats }) {
    if (!stats) return null;

    // Normalizzazione lato UI: non sostituisce i vincoli del DB,
    // ma evita di mostrare numeri incoerenti se arrivano valori parziali.
    const totalCards = Math.max(0, stats?.totalCards ?? 0);

    const studiedCards = Math.min(totalCards, Math.max(0, stats?.studiedCards ?? 0));

    // "Tentativi" = somma degli studied_count delle carte.
    const totalStudies = Math.max(0, stats?.totalStudies ?? 0);

    // Vincolo DB: 0 <= correct_count <= studied_count.
    // A livello aggregato: 0 <= totalCorrect <= totalStudies.
    const totalCorrect = Math.min(totalStudies, Math.max(0, stats?.totalCorrect ?? 0));

    // Evita incoerenze se il backend calcola "neverStudiedCards" con last_studied NULL.
    const neverStudiedCards = Math.max(0, totalCards - studiedCards);

    // Corrette/errate sono su base "tentativi", non "carte".
    const totalWrong = totalStudies - totalCorrect;

    // La precisione deve essere coerente con tentativi/corrette.
    // Se il backend manda già `accuracy`, la ricalcoliamo comunque (stessa semantica) per sicurezza.
    const accuracy = totalStudies > 0 ? Math.round((totalCorrect / totalStudies) * 100) : 0;

    return (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Carte Totali</div>
                <div className="text-2xl font-bold text-blue-600">{totalCards}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Studiate</div>
                <div className="text-2xl font-bold text-teal-600">{studiedCards}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Mai studiate</div>
                <div className="text-2xl font-bold text-amber-600">{neverStudiedCards}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Tentativi</div>
                <div className="text-2xl font-bold text-purple-600">{totalStudies}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Risposte corrette</div>
                <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Risposte errate</div>
                <div className="text-2xl font-bold text-red-600">{totalWrong}</div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Precisione</div>
                <div className="text-2xl font-bold text-indigo-600">{accuracy}%</div>
            </div>
        </div>
    );
}
