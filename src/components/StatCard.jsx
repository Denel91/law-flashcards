export default function StatCard({area, stats, color}) {
    const totalCards = stats?.totalCards ?? 0;
    const studiedCards = stats?.studiedCards ?? 0;
    const totalStudies = stats?.totalStudies ?? 0;
    const accuracy = stats?.accuracy ?? 0;
    const neverStudiedCards = stats?.neverStudiedCards ?? 0;

    return (
        <div className={`rounded-xl shadow-lg p-6 bg-linear-to-br ${color} text-white flex flex-col gap-2 transition-transform hover:scale-105`}>
            <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">{area}</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <div className="font-semibold">Carte Totali</div>
                    <div className="text-2xl">{totalCards}</div>
                </div>

                <div>
                    <div className="font-semibold">Studiate</div>
                    <div className="text-2xl">{studiedCards}</div>
                </div>

                <div>
                    <div className="font-semibold">Sessioni</div>
                    <div className="text-2xl">{totalStudies}</div>
                </div>

                <div>
                    <div className="font-semibold">Precisione</div>
                    <div className="text-2xl">{accuracy}%</div>
                </div>

                <div>
                    <div className="font-semibold">Mai studiate</div>
                    <div className="text-2xl">{neverStudiedCards}</div>
                </div>
            </div>
        </div>
    );
}
