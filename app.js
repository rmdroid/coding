// ===========================
// Book Management System - Frontend
// ===========================

class BookApp {
    constructor() {
        this.books = [];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.loadBooks();
        this.renderCarousel();
        this.setupEventListeners();
        this.startAutoPlay();
    }

    // Load books from localStorage
    loadBooks() {
        const stored = localStorage.getItem('books');
        this.books = stored ? JSON.parse(stored) : this.getDefaultBooks();
    }

    // Default demo books if none exist
    getDefaultBooks() {
        return [
            {
                id: Date.now(),
                title: 'Beispiel: KI Revolution 2025',
                category: 'Künstliche Intelligenz',
                description: 'Entdecken Sie die neuesten Entwicklungen in der KI und wie sie unsere Welt transformiert.',
                fullDescription: 'Ein umfassender Leitfaden zu den neuesten KI-Technologien und deren praktischer Anwendung in Unternehmen und Alltag.',
                author: 'Max Mustermann',
                price: '24,99',
                isbn: '978-3-16-148410-0',
                pages: 250,
                publisher: 'Tech Verlag',
                year: 2024,
                link: '#',
                cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhM2Q0ZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjM2IiBmaWxsPSIjNDBFMEQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5LSSBSZXZvbHV0aW9uPC90ZXh0Pjwvc3ZnPg==',
                documents: [],
                videos: [],
                videoUrls: [],
                images: []
            }
        ];
    }

    // Render the carousel
    renderCarousel() {
        const carousel = document.getElementById('booksCarousel');
        const dots = document.getElementById('carouselDots');

        if (!carousel) return;

        // Clear existing content
        carousel.innerHTML = '';
        dots.innerHTML = '';

        if (this.books.length === 0) {
            carousel.innerHTML = `
                <div class="empty-state">
                    <h3>Noch keine Bücher vorhanden</h3>
                    <p>Fügen Sie Ihr erstes Buch im <a href="admin.html">Admin-Bereich</a> hinzu.</p>
                </div>
            `;
            return;
        }

        // Render books
        this.books.forEach((book, index) => {
            const bookCard = this.createBookCard(book, index);
            carousel.appendChild(bookCard);

            // Create dot
            const dot = document.createElement('span');
            dot.className = `dot ${index === this.currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dots.appendChild(dot);
        });

        this.updateCarousel();
    }

    // Create book card element
    createBookCard(book, index) {
        const card = document.createElement('div');
        card.className = `book-card ${index === this.currentIndex ? 'active' : ''}`;
        card.dataset.index = index;

        const coverImage = book.cover || this.getPlaceholderImage();

        card.innerHTML = `
            <img src="${coverImage}" alt="${book.title}" class="book-cover">
            <p class="book-category">${book.category || 'Allgemein'}</p>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-description">${book.description || ''}</p>
            <button class="btn btn-primary" onclick="bookApp.openBookModal('${book.id}')">
                Mehr erfahren
            </button>
        `;

        return card;
    }

    // Placeholder image
    getPlaceholderImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhM2Q0ZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNDBFMEQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5CdWNoY292ZXI8L3RleHQ+PC9zdmc+';
    }

    // Update carousel position
    updateCarousel() {
        const cards = document.querySelectorAll('.book-card');
        const dots = document.querySelectorAll('.dot');

        cards.forEach((card, index) => {
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Scroll to active card
        const carousel = document.getElementById('booksCarousel');
        const activeCard = carousel.querySelector('.book-card.active');
        if (activeCard) {
            activeCard.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Navigation
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.books.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.books.length) % this.books.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    // Auto-play
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 8000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    // Open book detail modal
    openBookModal(bookId) {
        const book = this.books.find(b => b.id == bookId);
        if (!book) return;

        const modal = document.getElementById('bookModal');
        const modalBody = document.getElementById('modalBody');

        const coverImage = book.cover || this.getPlaceholderImage();

        let modalHTML = `
            <div class="modal-book-header">
                <img src="${coverImage}" alt="${book.title}" class="modal-book-cover">
                <div class="modal-book-info">
                    <h2>${book.title}</h2>
                    <p class="book-category">${book.category || 'Allgemein'}</p>
                    <div class="modal-book-meta">
                        ${book.author ? `<p><strong>Autor:</strong> ${book.author}</p>` : ''}
                        ${book.publisher ? `<p><strong>Verlag:</strong> ${book.publisher}</p>` : ''}
                        ${book.year ? `<p><strong>Jahr:</strong> ${book.year}</p>` : ''}
                        ${book.pages ? `<p><strong>Seiten:</strong> ${book.pages}</p>` : ''}
                        ${book.isbn ? `<p><strong>ISBN:</strong> ${book.isbn}</p>` : ''}
                        ${book.price ? `<p><strong>Preis:</strong> ${book.price} €</p>` : ''}
                    </div>
                    ${book.link ? `<a href="${book.link}" target="_blank" class="btn btn-primary">Jetzt kaufen</a>` : ''}
                </div>
            </div>
            <div class="modal-book-description">
                <p>${book.fullDescription || book.description || ''}</p>
            </div>
        `;

        // Add documents section
        if (book.documents && book.documents.length > 0) {
            modalHTML += `
                <div class="modal-media-section">
                    <h3>📄 Dokumente</h3>
                    <div class="media-grid">
                        ${book.documents.map(doc => `
                            <div class="media-item">
                                <p>📄 ${doc.name}</p>
                                <a href="${doc.data}" download="${doc.name}">Herunterladen</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Add videos section
        if ((book.videos && book.videos.length > 0) || (book.videoUrls && book.videoUrls.length > 0)) {
            modalHTML += `<div class="modal-media-section"><h3>🎥 Videos</h3><div class="media-grid">`;

            if (book.videos) {
                book.videos.forEach(video => {
                    modalHTML += `
                        <div class="media-item">
                            <video controls>
                                <source src="${video.data}" type="${video.type}">
                                Ihr Browser unterstützt keine Videos.
                            </video>
                            <p>${video.name}</p>
                        </div>
                    `;
                });
            }

            if (book.videoUrls) {
                book.videoUrls.forEach(url => {
                    const embedUrl = this.getEmbedUrl(url);
                    modalHTML += `
                        <div class="media-item">
                            <iframe width="100%" height="200" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                });
            }

            modalHTML += `</div></div>`;
        }

        // Add images section
        if (book.images && book.images.length > 0) {
            modalHTML += `
                <div class="modal-media-section">
                    <h3>🖼️ Weitere Bilder</h3>
                    <div class="media-grid">
                        ${book.images.map(img => `
                            <div class="media-item">
                                <img src="${img.data}" alt="${img.name}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        modalBody.innerHTML = modalHTML;
        modal.classList.add('active');
    }

    // Close modal
    closeModal() {
        const modal = document.getElementById('bookModal');
        modal.classList.remove('active');
    }

    // Convert YouTube/Vimeo URLs to embed URLs
    getEmbedUrl(url) {
        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId[1]}`;
            }
        }
        // Vimeo
        if (url.includes('vimeo.com')) {
            const videoId = url.match(/vimeo\.com\/(\d+)/);
            if (videoId) {
                return `https://player.vimeo.com/video/${videoId[1]}`;
            }
        }
        return url;
    }

    // Setup event listeners
    setupEventListeners() {
        // Carousel navigation
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.stopAutoPlay();
                this.startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.stopAutoPlay();
                this.startAutoPlay();
            });
        }

        // Modal close
        const closeModal = document.querySelector('.close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        const modal = document.getElementById('bookModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
}

// Initialize app when DOM is ready
let bookApp;
document.addEventListener('DOMContentLoaded', () => {
    bookApp = new BookApp();
});
