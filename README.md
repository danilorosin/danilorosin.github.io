# danilorosin.github.io

Sito personale di Danilo Rosin. È un sito statico in HTML e CSS, pubblicato con GitHub Pages.

## Struttura

```
index.html          → About me (home)
cv.html             → CV
publications.html   → Publications
style.css           → aspetto (colori, font, impaginazione)
script.js           → header che si scurisce allo scroll, menu su mobile, pubblicazioni apribili, ricerca
images/             → testate, foto profilo, avatar
fonts/              → Merriweather e Inter, gli stessi file usati da Google Sites
```

## Come pubblicarlo su GitHub Pages

1. Su GitHub apri il repository **danilorosin.github.io**. Se non esiste, crealo con esattamente questo nome e rendilo pubblico.
2. Clicca **Add file → Upload files** e trascina tutti i file e le cartelle `images` e `fonts` di questo pacchetto.
   - Se c'è già un `index.html`, verrà sostituito dalla nuova home.
3. Clicca **Commit changes**.
4. Vai in **Settings → Pages**. In "Build and deployment" scegli **Deploy from a branch**, poi il branch `main` e la cartella `/ (root)`, e salva.
5. Dopo uno o due minuti il sito è online su `https://danilorosin.github.io`.

## Come modificarlo

Puoi modificare i file direttamente su GitHub: apri un file, clicca la matita ✏️, cambia il testo e fai **Commit changes**.

- **Nuova voce nel CV:** in `cv.html` copia una riga intera (anno, i `<span class="tab">`, il nome in `<strong>` e il ruolo) e incollala nella sezione giusta. Le righe sono separate da `<br>`; le spaziature dopo l'anno sono le stesse tabulazioni del sito Google.
- **Nuova pubblicazione:** in `publications.html` copia tutto il blocco `<section class="row">` che contiene la pubblicazione (è segnalato da un commento) e incollalo sotto, poi cambia testi e link. Per una nuova categoria, come "Working Papers", copia il blocco con il titolo "Policy Writing" e cambia il testo.
- **La ricerca** (lente in alto a destra) legge da sola il testo delle tre pagine: non serve aggiornarla.
- **Cambiare un'immagine:** sostituisci il file in `images/` mantenendo lo stesso nome.
- **Header e footer** sono ripetuti in ognuna delle tre pagine. Se cambi email o link LinkedIn, aggiornali in tutti e tre i file.
