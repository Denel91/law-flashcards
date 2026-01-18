import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-linear-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-300 border-t border-gray-700 overflow-hidden">
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 p-2">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-3xl">📚</span>
                            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-400 hover:to-blue-400 transition-all duration-300">
                                Flashcards Giuridiche
                            </span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                            Il tuo strumento di studio intelligente per memorizzare
                            <br className="hidden md:block" />
                            <span className="md:hidden"> </span>
                            concetti giuridici con facilità ed efficacia.
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

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="https://github.com/Denel91"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors duration-300 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            aria-label="GitHub"
                            title="GitHub"
                        >
                            <span className="sr-only">GitHub</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 .5C5.73.5.75 5.62.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.2.72-3.88-1.6-3.88-1.6-.52-1.37-1.27-1.74-1.27-1.74-1.04-.73.08-.72.08-.72 1.15.08 1.76 1.22 1.76 1.22 1.02 1.8 2.68 1.28 3.33.98.1-.76.4-1.28.72-1.57-2.55-.3-5.23-1.31-5.23-5.83 0-1.29.44-2.35 1.17-3.17-.12-.3-.51-1.52.11-3.17 0 0 .96-.32 3.15 1.21a10.6 10.6 0 0 1 2.87-.4c.97 0 1.95.14 2.87.4 2.19-1.53 3.15-1.21 3.15-1.21.62 1.65.23 2.87.11 3.17.73.82 1.17 1.88 1.17 3.17 0 4.53-2.69 5.52-5.25 5.82.41.37.78 1.1.78 2.22 0 1.6-.02 2.89-.02 3.28 0 .32.21.69.8.57A11.26 11.26 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5Z" />
                            </svg>
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/daniele-di-salvo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#0A66C2] transition-colors duration-300 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/70"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.28V9h3.42v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                            </svg>
                        </Link>

                        <Link
                            href="https://www.instagram.com/denel2891/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#E4405F] transition-colors duration-300 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4405F]/70"
                            aria-label="Instagram"
                            title="Instagram"
                        >
                            <span className="sr-only">Instagram</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
                                <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
                                <path d="M17.5 6.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                            </svg>
                        </Link>

                        <Link
                            href="https://www.facebook.com/disalvo.daniele/?locale=it_IT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#1877F2] transition-colors duration-300 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2]/70"
                            aria-label="Facebook"
                            title="Facebook"
                        >
                            <span className="sr-only">Facebook</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                <path d="M13.5 22v-8h3l.5-3H13.5V9c0-.87.23-1.46 1.51-1.46H17V4.86c-.34-.05-1.5-.16-2.83-.16-2.8 0-4.67 1.71-4.67 4.85V11H7v3h2.5v8h4Z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
