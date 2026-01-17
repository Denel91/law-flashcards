'use client';

import {useState} from 'react';

export default function FlashcardForm({flashcard, onSave, onCancel, isSaving}) {
    // Inizializza lo stato dai props
    const [question, setQuestion] = useState((flashcard?.question || '').trim());
    const [answer, setAnswer] = useState((flashcard?.answer || '').trim());

    // Teniamo traccia dell'ID della flashcard attuale per capire quando cambia
    const [prevFlashcardId, setPrevFlashcardId] = useState(flashcard?.id);

    // Se l'ID della flashcard è cambiato, aggiorniamo lo stato durante il rendering.
    // React ri-eseguirà il componente immediatamente con i nuovi valori prima di mostrare nulla all'utente.
    if (flashcard?.id !== prevFlashcardId) {
        setPrevFlashcardId(flashcard?.id);
        setQuestion((flashcard?.question || '').trim());
        setAnswer((flashcard?.answer || '').trim());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim() || !answer.trim()) {
            alert('Compila entrambi i campi');
            return;
        }

        await onSave(question, answer);

        // Pulisci i campi (stesso comportamento attuale)
        setQuestion('');
        setAnswer('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {flashcard?.id ? 'Modifica Flashcard' : 'Nuova Flashcard'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-800 font-semibold mb-2">
                            Quesito
                        </label>
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 text-gray-900"
                            rows="6"
                            placeholder="Inserisci il quesito giuridico..."
                            required
                            disabled={isSaving}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-800 font-semibold mb-2">
                            Risposta
                        </label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 text-gray-900"
                            rows="10"
                            placeholder="Inserisci la risposta..."
                            required
                            disabled={isSaving}
                        />
                    </div>

                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {isSaving ? 'Salvataggio...' : flashcard?.id ? 'Salva' : 'Crea'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
