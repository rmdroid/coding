# 📚 Professionelle Bücher-Webapp

Eine moderne, professionelle Webapp zur Präsentation Ihrer Bücher mit automatisch generierten Landingpages. Inspiriert vom Design von books.rm-on.de.

## ✨ Features

- 🎨 **Modernes Design** - Glassmorphismus-Effekte, Türkis-Gradient auf dunklem Hintergrund
- 📱 **Vollständig Responsive** - Optimiert für Desktop, Tablet und Mobile
- 🎪 **3D-Karussell** - Elegante Präsentation Ihrer Bücher mit Auto-Play
- 📤 **Einfacher Upload** - Admin-Bereich zum Hochladen von:
  - Buchcover (Bilder)
  - PDF-Dokumente (Leseproben, Inhaltsverzeichnis)
  - Videos (MP4, WebM oder YouTube/Vimeo URLs)
  - Zusätzliche Bilder
- 💾 **Keine Datenbank nötig** - Alle Daten werden im Browser (localStorage) gespeichert
- 🚀 **Sofort einsatzbereit** - Nur HTML, CSS und JavaScript - kein Backend erforderlich

## 📁 Projektstruktur

```
/
├── index.html        # Hauptseite mit Buchkarussell
├── admin.html        # Admin-Bereich zum Verwalten der Bücher
├── styles.css        # Alle Styles (Glassmorphismus, Gradients, Responsive)
├── app.js           # Frontend-Logik (Karussell, Modals, Navigation)
├── admin.js         # Admin-Logik (CRUD-Operationen, File-Upload)
└── README.md        # Diese Datei
```

## 🚀 Installation & Start

### Option 1: Lokaler Webserver (Empfohlen)

1. **Dateien herunterladen**
   ```bash
   # Falls noch nicht geschehen, Dateien in ein Verzeichnis kopieren
   cd /pfad/zu/ihrem/projekt
   ```

2. **Python-Server starten** (Python 3)
   ```bash
   python -m http.server 8000
   ```
   Oder mit Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. **Im Browser öffnen**
   ```
   http://localhost:8000
   ```

### Option 2: Live Server (VS Code)

1. **Live Server Extension** in VS Code installieren
2. Rechtsklick auf `index.html` → "Open with Live Server"

### Option 3: Direkt im Browser öffnen

Doppelklick auf `index.html` - Funktioniert, aber manche Features (wie File-Upload) können eingeschränkt sein.

## 📖 Anleitung

### 1. Erstes Buch hinzufügen

1. Öffnen Sie den **Admin-Bereich**: `http://localhost:8000/admin.html`
2. Klicken Sie auf **"+ Neues Buch hinzufügen"**
3. Füllen Sie das Formular aus:

   **Pflichtfelder:**
   - Buchtitel
   - Kategorie
   - Kurzbeschreibung

   **Optionale Felder:**
   - Ausführliche Beschreibung
   - Autor
   - Preis
   - ISBN
   - Seitenzahl
   - Verlag
   - Erscheinungsjahr
   - Kauflink (URL zu Amazon, Gumroad, etc.)

4. **Medien hochladen:**
   - **Cover-Bild**: Empfohlen 400x600px oder ähnliches Buchcover-Format
   - **Dokumente**: PDFs, DOCX (Leseproben, Inhaltsverzeichnis)
   - **Videos**: MP4/WebM Dateien oder YouTube/Vimeo URLs (kommagetrennt)
   - **Zusätzliche Bilder**: Weitere Bilder für die Detailansicht

5. Klicken Sie auf **"Speichern"**

### 2. Buch bearbeiten

1. Im Admin-Bereich auf **"✏️ Bearbeiten"** klicken
2. Änderungen vornehmen
3. Auf **"Speichern"** klicken

### 3. Buch löschen

1. Im Admin-Bereich auf **"🗑️ Löschen"** klicken
2. Bestätigen Sie die Löschung

### 4. Bücher auf der Hauptseite ansehen

1. Öffnen Sie die Hauptseite: `http://localhost:8000`
2. Navigieren Sie durch das Karussell:
   - **Pfeiltasten** ← → auf der Tastatur
   - **Maus**: Klicken Sie auf die Navigationspfeile
   - **Dots**: Klicken Sie auf die Punkte unter dem Karussell
   - **Auto-Play**: Das Karussell wechselt automatisch alle 8 Sekunden

3. Klicken Sie auf **"Mehr erfahren"**, um die Detailansicht zu öffnen

## 🎨 Design-Anpassungen

### Farben ändern

Öffnen Sie `styles.css` und passen Sie die CSS-Variablen an:

```css
:root {
    --primary-dark: #102327;      /* Dunkler Hintergrund */
    --primary-blue: #1a3d4f;      /* Mittlerer Hintergrund */
    --accent-turquoise: #40E0D0;  /* Türkis-Akzent */
    --accent-teal: #20B2AA;       /* Teal-Akzent */
    /* ... */
}
```

### Logo/Branding ändern

In `index.html` und `admin.html`, Zeile ~12:

```html
<div class="nav-brand">
    <h1>📚 Ihr Name / Ihre Marke</h1>
</div>
```

### "Über"-Bereich anpassen

In `index.html`, Zeile ~65:

```html
<section id="about" class="about-section">
    <div class="container">
        <div class="about-card glass-card">
            <h2>Über den Autor</h2>
            <p>Ihr Text hier...</p>
        </div>
    </div>
</section>
```

## 💡 Features im Detail

### Karussell-System

- **3D-Effekt**: Aktives Buch wird hervorgehoben (größer, heller)
- **Auto-Play**: Automatischer Wechsel alle 8 Sekunden
- **Navigation**: Pfeiltasten, Maus-Klicks, Keyboard-Shortcuts
- **Responsive**: Passt sich allen Bildschirmgrößen an

### Modal-Detailansicht

Beim Klick auf "Mehr erfahren" öffnet sich ein Modal mit:
- Großes Cover-Bild
- Alle Buchinformationen
- Download-Links für Dokumente
- Eingebettete Videos
- Bildergalerie

### Media-Upload

**Unterstützte Formate:**
- **Bilder**: JPG, PNG, GIF, WebP
- **Dokumente**: PDF, DOC, DOCX, TXT
- **Videos**: MP4, WebM, OGG
- **Video-URLs**: YouTube, Vimeo (automatische Embed-Konvertierung)

**Speicherung:**
- Dateien werden als Base64 im localStorage gespeichert
- **Wichtig**: Browser-Limit beachten (meist 5-10 MB pro Domain)
- Für größere Projekte: Backend mit echter Datenbank empfohlen

## 🔧 Erweiterte Anpassungen

### Backend-Integration

Wenn Sie ein Backend hinzufügen möchten, ersetzen Sie in `app.js` und `admin.js` die localStorage-Funktionen durch API-Calls:

```javascript
// Statt:
localStorage.setItem('books', JSON.stringify(this.books));

// Verwenden Sie:
await fetch('/api/books', {
    method: 'POST',
    body: JSON.stringify(this.books)
});
```

### Suchfunktion hinzufügen

Fügen Sie in `index.html` ein Suchfeld hinzu und implementieren Sie die Filterlogik in `app.js`.

### Kategorien-Filter

Erweitern Sie das Karussell um Filter-Buttons für verschiedene Kategorien.

## 📊 Browser-Kompatibilität

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## 🐛 Bekannte Einschränkungen

1. **localStorage-Limit**:
   - Browser haben ein Limit von ~5-10 MB
   - Bei vielen/großen Bildern kann dieses Limit erreicht werden
   - Lösung: Backend mit Dateispeicher verwenden

2. **Keine Server-seitige Validierung**:
   - Alle Daten werden nur clientseitig gespeichert
   - Für Produktionsumgebungen: Backend empfohlen

3. **Keine Benutzer-Authentifizierung**:
   - Der Admin-Bereich ist öffentlich zugänglich
   - Für Produktion: Login-System implementieren

## 🚀 Deployment

### GitHub Pages

1. Repository auf GitHub erstellen
2. Dateien hochladen
3. In Settings → Pages → Source: "main branch" wählen
4. Fertig! Ihre Seite ist unter `https://username.github.io/repository` erreichbar

### Netlify / Vercel

1. Drag & Drop Ihrer Dateien auf netlify.com oder vercel.com
2. Automatisches Deployment
3. Kostenloser HTTPS-Support

### Eigener Server

1. Dateien per FTP/SFTP auf Ihren Webserver hochladen
2. Fertig!

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz - Sie können es frei verwenden, anpassen und verteilen.

## 🆘 Support

Bei Fragen oder Problemen:
1. Öffnen Sie die Browser-Konsole (F12) für Fehlermeldungen
2. Überprüfen Sie, ob alle Dateien korrekt geladen wurden
3. Testen Sie in einem anderen Browser

## 🎯 Roadmap / Mögliche Erweiterungen

- [ ] Backend-Integration (Node.js, PHP, Python)
- [ ] Benutzer-Authentifizierung
- [ ] Mehrsprachigkeit
- [ ] Export/Import-Funktion für Bücher
- [ ] Statistiken (Klicks, Views)
- [ ] Newsletter-Integration
- [ ] Social Media Sharing
- [ ] SEO-Optimierung
- [ ] PWA-Support (Offline-Funktionalität)

---

**Viel Erfolg mit Ihrer Bücher-Webapp! 📚✨**
