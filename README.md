# ⚖️ Flashcards Giuridiche - App di Studio per Diritto

Un'applicazione web moderna e interattiva per studiare il diritto attraverso flashcards organizzate per materia. Costruita con **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** e **Supabase**.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase_JS-2.90.1-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Caratteristiche

### 🎯 Funzionalità Core
- ✅ **Tre aree di studio**: Diritto Civile, Amministrativo e Penale
- ✅ **Flashcards interattive** con animazione 3D flip
- ✅ **CRUD completo**: Crea, Leggi, Aggiorna, Elimina flashcards
- ✅ **Navigazione** tra le flashcards (pulsanti / scorciatoie)
- ✅ **Modale di conferma** per operazioni critiche
- ✅ **Barra di progresso** visiva per tracciare lo studio
- ✅ **Ricerca e filtri** (testo, studiate / non studiate)
- ✅ **Statistiche** per area e globali (`/global-stats`)

### 🎨 UX/UI Moderna
- 🌈 **Gradienti colorati** personalizzati per ogni area
- 🔄 **Animazioni fluide** e transizioni CSS
- ⌨️ **Scorciatoie da tastiera** (frecce ←/→, ESC)
- 📱 **Mobile-first** con design adattivo
- 🎭 **Modali** con backdrop blur
- 💫 **Loading states** e feedback visivi

### 🔒 Tecnologie Moderne
- ⚡ **Next.js 16** con App Router
- ⚛️ **React 19** (abilitato React Compiler via `reactCompiler: true`)
- 🎨 **Tailwind CSS v4** (`@tailwindcss/postcss`)
- 🗄️ **Supabase** (client `@supabase/supabase-js` + `@supabase/ssr`)
- 📦 **ESLint 9**

---

## 🛠 Tecnologie Utilizzate

### Frontend
| Tecnologia       | Versione | Scopo                                |
|------------------|----------|--------------------------------------|
| **Next.js**      | 16.1.1   | Framework React con SSR e App Router |
| **React**        | 19.2.3   | Libreria UI                          |
| **Tailwind CSS** | ^4       | Framework CSS utility-first          |
| **ESLint**       | ^9       | Linting e code quality               |

### Backend
| Tecnologia                | Versione | Scopo                           |
|---------------------------|----------|---------------------------------|
| **@supabase/supabase-js** | ^2.90.1  | Client JavaScript per Supabase  |
| **@supabase/ssr**         | ^0.8.0   | Helper SSR/browser per Supabase |

### Build Tools
- **PostCSS** - Trasformazione CSS
- **@tailwindcss/postcss** - Integrazione Tailwind v4
- **pnpm** (workspace presente) *(in alternativa: npm)*

---

## 🚀 Installazione e Avvio Locale

> Nota: il repository usa **pnpm** (presente `pnpm-lock.yaml`). Se preferisci puoi usare anche `npm`, ma è consigliato mantenere pnpm per coerenza.

1. **Installa le dipendenze:**
   ```bash
   pnpm install
   ```

2. **Configura Supabase** (vedi sezione sotto) creando `.env.local`.

3. **Avvia il server di sviluppo:**
   ```bash
   pnpm dev
   ```
   L'app sarà disponibile su [http://localhost:3000](http://localhost:3000)

### (Alternativa) con npm
```bash
npm install
npm run dev
```

---

## ⚙️ Configurazione Supabase

L'app usa Supabase tramite `@supabase/ssr`.

Crea un file `.env.local` nella root:
```env
NEXT_PUBLIC_SUPABASE_URL=la-tua-url-supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=la-tua-publishable-key
```

> Nel codice queste variabili sono lette in `src/utils/supabase/client.js` e `src/utils/supabase/server.js`.

### Nota DB (statistiche)
Le statistiche di studio usano una **RPC** chiamata `increment_flashcard_stats` (vedi `src/lib/flashcardService.js`). Assicurati che esista nel tuo database Supabase.

---

## 🧭 Rotte Principali

- `/` — Home/Dashboard aree
- `/area/[id]` — Area di studio (es. `civile`, `amministrativo`, `penale`)
- `/global-stats` — Statistiche globali
- `/contacts` — Contatti

---

## 🗂️ Struttura del Progetto

```
law-flashcards/
├── public/                # Immagini e asset statici
├── src/
│   ├── app/               # Routing Next.js (App Router)
│   │   ├── area/[id]/     # Pagine area di studio
│   │   ├── global-stats/  # Statistiche globali
│   │   ├── contacts/      # Pagina contatti
│   ├── components/        # Componenti React riutilizzabili
│   ├── lib/               # Servizi (es. flashcardService)
│   ├── utils/             # Utils (Supabase client/server)
├── package.json           # Dipendenze e script
├── pnpm-lock.yaml         # Lockfile pnpm
└── README.md              # Documentazione
```

---

## 🧩 Componenti Principali

- `Flashcard.jsx` - Card interattiva con animazione flip
- `FlashcardForm.jsx` - Form per creare/modificare flashcard
- `AreaStats.jsx` - Statistiche per area di studio
- `GlobalStatsClient.jsx` - Statistiche globali aggregate
- `StatCard.jsx` - Card per visualizzare metriche
- `Footer.jsx` - Footer informativo

---

## 📊 Novità e Funzionalità Recenti

- **Statistiche di studio**: contatori `studied_count`, `correct_count`, `last_studied`
- **Aggiornamento atomico stats via RPC**: `increment_flashcard_stats`
- **Ricerca e filtri**: funzioni dedicate in `flashcardService`

---

## 📞 Supporto e Contatti

La pagina contatti è disponibile nella rotta `/contacts`.

Per segnalare bug o proporre miglioramenti, apri una issue sul repository.

---

## 🙏 Ringraziamenti

<div align="center">

Questo progetto è reso possibile grazie a:

<br>

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br>

**Un ringraziamento speciale alla comunità Open Source** 💙

</div>

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT**. Vedi il file [LICENSE.MD](./LICENSE.MD) per i dettagli.

---

**⭐ Se questo progetto ti è utile, lascia una stella su GitHub!**

**📚 Buono studio con le tue flashcards giuridiche!**

---
