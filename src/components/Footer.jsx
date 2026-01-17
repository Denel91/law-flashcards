import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-300 border-t border-gray-700 overflow-hidden">
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-3xl">📚</span>
                            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-400 transition-all duration-300">
                                Flashcards Giuridiche
                            </span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                            Il tuo strumento di studio intelligente per memorizzare concetti giuridici con facilità ed
                            efficacia.
                        </p>
                    </div>

                    {/* Sezione Aree */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 hover:text-cyan-400 transition-colors duration-300">Aree del Diritto</h4>
                        <ul className="space-y-2">
                            <li className="transform hover:translate-x-2 transition-transform duration-200">
                                <Link href="/area/civile"
                                   className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center gap-2 group">
                                    <span className="group-hover:scale-125 transition-transform duration-200">⚖️</span>
                                    <span className="relative">
                                        Diritto Civile
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                                    </span>
                                </Link>
                            </li>
                            <li className="transform hover:translate-x-2 transition-transform duration-200">
                                <Link href="/area/amministrativo"
                                   className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group">
                                    <span className="group-hover:scale-125 transition-transform duration-200">🏛️</span>
                                    <span className="relative">
                                        Diritto Amministrativo
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                                    </span>
                                </Link>
                            </li>
                            <li className="transform hover:translate-x-2 transition-transform duration-200">
                                <Link href="/area/penale"
                                   className="text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center gap-2 group">
                                    <span className="group-hover:scale-125 transition-transform duration-200">👨‍⚖️</span>
                                    <span className="relative">
                                        Diritto Penale
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Sezione Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4 hover:text-cyan-400 transition-colors duration-300">Informazioni</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-300 flex items-center gap-2 hover:text-white transform hover:translate-x-2 transition-all duration-200 group">
                                <span className="group-hover:rotate-12 transition-transform duration-200">📖</span>
                                <span>Sistema di ripetizione innovativo</span>
                            </li>
                            <li className="text-gray-300 flex items-center gap-2 hover:text-white transform hover:translate-x-2 transition-all duration-200 group">
                                <span className="group-hover:rotate-12 transition-transform duration-200">🎯</span>
                                <span>Memorizzazione efficace</span>
                            </li>
                            <li className="text-gray-300 flex items-center gap-2 hover:text-white transform hover:translate-x-2 transition-all duration-200 group">
                                <span className="group-hover:rotate-12 transition-transform duration-200">✨</span>
                                <span>Interfaccia intuitiva</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divisore */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm hover:text-gray-200 transition-colors duration-300">
                        © {new Date().getFullYear()} Daniele Di Salvo. Tutti i diritti riservati.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="#"
                           className="text-gray-400 hover:text-white transition-all duration-300 text-sm relative group">
                            Privacy Policy
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="#"
                           className="text-gray-400 hover:text-white transition-all duration-300 text-sm relative group">
                            Termini di Servizio
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/contacts"
                           className="text-gray-400 hover:text-white transition-all duration-300 text-sm relative group">
                            Contatti
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
