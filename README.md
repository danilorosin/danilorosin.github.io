# danilorosin.github.io

Sito personale di Danilo Rosin. 

## Struttura

```
index.html          → About me (home)
cv.html             → CV
publications.html   → Publications
style.css           → aspetto (colori, font, impaginazione)
script.js           → header che si scurisce allo scroll e menu su mobile
images/             → testate, foto profilo, avatar
```

## Come pubblicarlo su GitHub Pages

1. Su GitHub apri il repository **danilorosin.github.io**. Se non esiste, crealo con esattamente questo nome e rendilo pubblico.
2. Clicca **Add file → Upload files** e trascina tutti i file e la cartella `images` di questo pacchetto.
   - Se nel repository c'è già la cartella `CV/`, lasciala dov'è: il link "CV" del sito punta lì.
   - Se c'è già un `index.html`, verrà sostituito dalla nuova home.
3. Clicca **Commit changes**.
4. Vai in **Settings → Pages**. In "Build and deployment" scegli **Deploy from a branch**, poi il branch `main` e la cartella `/ (root)`, e salva.
5. Dopo uno o due minuti il sito è online su `https://danilorosin.github.io`.

## Come modificarlo

Puoi modificare i file direttamente su GitHub: apri un file, clicca la matita ✏️, cambia il testo e fai **Commit changes**.

- **Nuova voce nel CV:** in `cv.html` copia una riga `<li>…</li>` dentro la sezione giusta e cambia anno e testo.
- **Nuova pubblicazione:** in `publications.html` copia tutto il blocco `<details class="pub"> … </details>` e incollalo sotto. Per una nuova categoria, come "Working Papers", aggiungi prima un `<h2 class="section-title section-title--lg">Working Papers</h2>`.
- **Cambiare un'immagine:** sostituisci il file in `images/` mantenendo lo stesso nome.
- **Header e footer** sono ripetuti in ognuna delle tre pagine. Se cambi email o link LinkedIn, aggiornali in tutti e tre i file.
