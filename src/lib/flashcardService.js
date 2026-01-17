import { createClient } from '@/utils/supabase/client';

// Costanti per le aree legali (allineate all'ENUM flashcard_area)
export const legalAreas = {
    CIVILE: 'civile',
    AMMINISTRATIVO: 'amministrativo',
    PENALE: 'penale',
};

// FUNZIONE 1: Recupera tutte le flashcards di un'area
export async function getFlashcards(area) {
    const supabase = createClient();

    if (!area) return [];

    const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('area', area)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
}

// FUNZIONE 2: Crea una nuova flashcard
export async function createFlashcard(area, question, answer) {
    const supabase = createClient();

    if (!area) throw new Error('Area mancante');

    const q = (question ?? '').trim();
    const a = (answer ?? '').trim();

    if (!q || !a) {
        throw new Error('Domanda e risposta non possono essere vuote');
    }

    const payload = {
        area,
        question: q,
        answer: a,
        studied_count: 0,
        correct_count: 0,
        last_studied: null,
    };

    const { data, error } = await supabase.from('flashcards').insert([payload]).select().single();

    if (error) throw error;
    return data;
}

// FUNZIONE 3: Aggiorna una flashcard esistente
export async function updateFlashcard(id, question, answer) {
    const supabase = createClient();

    if (!id) throw new Error('ID mancante');

    const q = (question ?? '').trim();
    const a = (answer ?? '').trim();

    if (!q || !a) {
        throw new Error('Domanda e risposta non possono essere vuote');
    }

    const { data, error } = await supabase
        .from('flashcards')
        .update({
            question: q,
            answer: a,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// FUNZIONE 4: Elimina una flashcard
export async function deleteFlashcard(id) {
    const supabase = createClient();

    if (!id) throw new Error('ID mancante');

    const { error } = await supabase.from('flashcards').delete().eq('id', id);

    if (error) throw error;
    return true;
}

// FUNZIONE 5: Conta le flashcards per area
export async function countFlashcardsByArea(area) {
    const supabase = createClient();

    const { count, error } = await supabase
        .from('flashcards')
        .select('*', { count: 'exact', head: true })
        .eq('area', area);

    if (error) throw error;
    return count || 0;
}

// ============================================
// FUNZIONI PER STATISTICHE (schema nuovo)
// ============================================

// Aggiorna le statistiche dopo lo studio
export async function updateFlashcardStats(id, isCorrect) {
    const supabase = createClient();

    if (!id) throw new Error('ID mancante');

    const correct = Boolean(isCorrect);
    const nowISO = new Date().toISOString();

    // Versione A: aggiornamento atomico esclusivamente via RPC.
    // IMPORTANT: la consistenza (no race) è garantita solo lato DB, quindi niente fallback client-side.
    const { error: rpcError } = await supabase.rpc('increment_flashcard_stats', {
        p_id: id,
        p_is_correct: correct,
    });

    if (rpcError) {
        // Errore esplicito: la RPC deve esistere e funzionare.
        const message = rpcError?.message || String(rpcError);
        throw new Error(`RPC increment_flashcard_stats fallita: ${message}`);
    }

    // Assicura last_studied aggiornato anche se l'RPC non lo fa.
    const { error: lastStudiedError } = await supabase
        .from('flashcards')
        .update({ last_studied: nowISO })
        .eq('id', id);

    if (lastStudiedError) {
        const message = lastStudiedError?.message || String(lastStudiedError);
        throw new Error(`Impossibile aggiornare last_studied: ${message}`);
    }

    // Source of truth: ritorna sempre il record aggiornato dal DB.
    const { data: updated, error: fetchUpdatedError } = await supabase
        .from('flashcards')
        .select('id, studied_count, correct_count, last_studied, updated_at')
        .eq('id', id)
        .single();

    if (fetchUpdatedError) throw fetchUpdatedError;
    return updated;
}

// Ottieni statistiche per area
export async function getAreaStats(area) {
    const supabase = createClient();

    if (!area) {
        return {
            totalCards: 0,
            studiedCards: 0,
            neverStudiedCards: 0,
            totalStudies: 0,
            totalCorrect: 0,
            accuracy: 0,
        };
    }

    const { data = [], error } = await supabase
        .from('flashcards')
        .select('studied_count, correct_count, last_studied')
        .eq('area', area);

    if (error) throw error;

    const totalCards = Math.max(0, data.length);

    let studiedCards = 0;
    let neverStudiedCards = 0;
    let totalStudies = 0;
    let totalCorrect = 0;

    for (const c of data) {
        const studiedRaw = Number(c?.studied_count ?? 0);
        const correctRaw = Number(c?.correct_count ?? 0);

        // Vincoli per singola flashcard
        const studied = Math.max(0, studiedRaw);
        const correct = Math.min(studied, Math.max(0, correctRaw));

        totalStudies += studied;
        totalCorrect += correct;

        if (studied > 0) studiedCards += 1;
        if (c?.last_studied == null) neverStudiedCards += 1;
    }

    // Clamp aggregati (ulteriore safety)
    totalStudies = Math.max(0, totalStudies);
    studiedCards = Math.min(totalCards, Math.max(0, studiedCards));
    neverStudiedCards = Math.min(totalCards, Math.max(0, neverStudiedCards));
    totalCorrect = Math.min(totalStudies, Math.max(0, totalCorrect));

    const accuracy = totalStudies > 0 ? (totalCorrect / totalStudies) * 100 : 0;

    return {
        totalCards,
        studiedCards,
        neverStudiedCards,
        totalStudies,
        totalCorrect,
        accuracy: Number(accuracy.toFixed(1)),
    };
}

// ============================================
// FUNZIONI PER RICERCA E FILTRI
// ============================================

// Ricerca flashcards per testo
// noinspection JSUnusedGlobalSymbols
export async function searchFlashcards(area, searchTerm) {
    const supabase = createClient();

    const term = (searchTerm ?? '').trim();
    if (!area || !term) return [];

    // Escape minimale per evitare che `.or()` si rompa con virgole/parentesi/backslash.
    // Inoltre escape di % e _ perché in ILIKE sono wildcard.
    const escaped = term
        .replace(/\\/g, '\\\\')
        .replace(/%/g, '\\%')
        .replace(/_/g, '\\_')
        .replace(/,/g, '\\,')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');

    const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('area', area)
        // Nota: PostgREST usa la sintassi `or=col.operator.value,col2.operator.value`
        .or(`question.ilike.%${escaped}%,answer.ilike.%${escaped}%`)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

// Filtra flashcards per tipo
// noinspection JSUnusedGlobalSymbols
export async function filterFlashcards(area, filterType) {
    const supabase = createClient();

    let query = supabase.from('flashcards').select('*').eq('area', area);

    switch (filterType) {
        case 'not-studied':
            // Mai studiate: last_studied IS NULL (supportata anche da partial index)
            query = query.is('last_studied', null).order('created_at', { ascending: false });
            break;

        case 'studied':
            // Studiate almeno una volta
            query = query.not('last_studied', 'is', null).order('last_studied', {
                ascending: false,
                nullsFirst: false,
            });
            break;

        case 'recent':
            // Ordina per ultimo studio
            query = query.order('last_studied', { ascending: false, nullsFirst: false });
            break;

        default:
            query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
}

// Ottieni statistiche globali (tutte le aree)
export async function getGlobalStats() {
    const areas = Object.values(legalAreas);
    // Avvia tutte le richieste contemporaneamente
    const results = await Promise.all(areas.map(area => getAreaStats(area)));

    // Ricompone l'oggetto finale
    return areas.reduce((acc, area, index) => {
        acc[area] = results[index];
        return acc;
    }, {});
}
