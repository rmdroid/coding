// ===========================
// Book Management System - Admin
// ===========================

class BookAdmin {
    constructor() {
        this.books = [];
        this.currentBookId = null;
        this.coverFile = null;
        this.documentFiles = [];
        this.videoFiles = [];
        this.imageFiles = [];
        this.init();
    }

    init() {
        this.loadBooks();
        this.renderBooksList();
        this.setupEventListeners();
    }

    // Load books from localStorage
    loadBooks() {
        const stored = localStorage.getItem('books');
        this.books = stored ? JSON.parse(stored) : [];
    }

    // Save books to localStorage
    saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    // Render books list
    renderBooksList() {
        const booksList = document.getElementById('booksList');
        if (!booksList) return;

        booksList.innerHTML = '';

        if (this.books.length === 0) {
            booksList.innerHTML = `
                <div class="empty-state glass-card">
                    <h3>Noch keine Bücher vorhanden</h3>
                    <p>Klicken Sie auf "Neues Buch hinzufügen", um Ihr erstes Buch anzulegen.</p>
                </div>
            `;
            return;
        }

        this.books.forEach(book => {
            const bookCard = this.createBookCard(book);
            booksList.appendChild(bookCard);
        });
    }

    // Create book card for admin list
    createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'admin-book-card';

        const coverImage = book.cover || this.getPlaceholderImage();

        card.innerHTML = `
            <img src="${coverImage}" alt="${book.title}" class="admin-book-cover">
            <p class="book-category">${book.category || 'Allgemein'}</p>
            <h3>${book.title}</h3>
            <p>${book.description ? book.description.substring(0, 100) + '...' : ''}</p>
            <div class="admin-actions">
                <button class="btn-edit" onclick="bookAdmin.editBook('${book.id}')">✏️ Bearbeiten</button>
                <button class="btn-delete" onclick="bookAdmin.deleteBook('${book.id}')">🗑️ Löschen</button>
            </div>
        `;

        return card;
    }

    // Placeholder image
    getPlaceholderImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFhM2Q0ZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNDBFMEQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5CdWNoY292ZXI8L3RleHQ+PC9zdmc+';
    }

    // Show book form
    showBookForm(bookId = null) {
        const form = document.getElementById('bookForm');
        const formTitle = document.getElementById('formTitle');

        this.currentBookId = bookId;
        this.resetForm();

        if (bookId) {
            const book = this.books.find(b => b.id == bookId);
            if (book) {
                formTitle.textContent = 'Buch bearbeiten';
                this.populateForm(book);
            }
        } else {
            formTitle.textContent = 'Neues Buch hinzufügen';
        }

        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
    }

    // Hide book form
    hideBookForm() {
        const form = document.getElementById('bookForm');
        form.style.display = 'none';
        this.resetForm();
    }

    // Reset form
    resetForm() {
        document.getElementById('bookDataForm').reset();
        document.getElementById('bookId').value = '';
        document.getElementById('coverPreview').innerHTML = '';
        document.getElementById('documentsPreview').innerHTML = '';
        document.getElementById('videosPreview').innerHTML = '';
        document.getElementById('imagesPreview').innerHTML = '';

        this.coverFile = null;
        this.documentFiles = [];
        this.videoFiles = [];
        this.imageFiles = [];
    }

    // Populate form with book data
    populateForm(book) {
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookTitle').value = book.title || '';
        document.getElementById('bookCategory').value = book.category || '';
        document.getElementById('bookDescription').value = book.description || '';
        document.getElementById('bookFullDescription').value = book.fullDescription || '';
        document.getElementById('bookAuthor').value = book.author || '';
        document.getElementById('bookPrice').value = book.price || '';
        document.getElementById('bookISBN').value = book.isbn || '';
        document.getElementById('bookPages').value = book.pages || '';
        document.getElementById('bookPublisher').value = book.publisher || '';
        document.getElementById('bookYear').value = book.year || '';
        document.getElementById('bookLink').value = book.link || '';

        // Show existing cover
        if (book.cover) {
            document.getElementById('coverPreview').innerHTML = `
                <div class="preview-item">
                    <img src="${book.cover}" alt="Cover">
                </div>
            `;
        }

        // Show existing documents
        if (book.documents && book.documents.length > 0) {
            this.documentFiles = book.documents;
            this.renderFilesPreviews('documents', book.documents);
        }

        // Show existing videos
        if (book.videos && book.videos.length > 0) {
            this.videoFiles = book.videos;
            this.renderFilesPreviews('videos', book.videos);
        }

        // Show video URLs
        if (book.videoUrls && book.videoUrls.length > 0) {
            document.getElementById('videoUrls').value = book.videoUrls.join(', ');
        }

        // Show existing images
        if (book.images && book.images.length > 0) {
            this.imageFiles = book.images;
            this.renderFilesPreviews('images', book.images);
        }
    }

    // Render files previews
    renderFilesPreviews(type, files) {
        const container = document.getElementById(`${type}Preview`);
        container.innerHTML = '';

        files.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `
                <span>📄 ${file.name}</span>
                <button type="button" class="remove-file" onclick="bookAdmin.removeFile('${type}', ${index})">×</button>
            `;
            container.appendChild(item);
        });
    }

    // Remove file
    removeFile(type, index) {
        if (type === 'documents') {
            this.documentFiles.splice(index, 1);
            this.renderFilesPreviews('documents', this.documentFiles);
        } else if (type === 'videos') {
            this.videoFiles.splice(index, 1);
            this.renderFilesPreviews('videos', this.videoFiles);
        } else if (type === 'images') {
            this.imageFiles.splice(index, 1);
            this.renderFilesPreviews('images', this.imageFiles);
        }
    }

    // Handle cover upload
    async handleCoverUpload(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.coverFile = e.target.result;
            document.getElementById('coverPreview').innerHTML = `
                <div class="preview-item">
                    <img src="${e.target.result}" alt="Cover Preview">
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }

    // Handle multiple files upload
    async handleFilesUpload(files, type) {
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileData = {
                    name: file.name,
                    type: file.type,
                    data: e.target.result
                };

                if (type === 'documents') {
                    this.documentFiles.push(fileData);
                    this.renderFilesPreviews('documents', this.documentFiles);
                } else if (type === 'videos') {
                    this.videoFiles.push(fileData);
                    this.renderFilesPreviews('videos', this.videoFiles);
                } else if (type === 'images') {
                    this.imageFiles.push(fileData);
                    this.renderFilesPreviews('images', this.imageFiles);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // Save book
    async saveBook(formData) {
        const bookId = formData.get('bookId');

        // Parse video URLs
        const videoUrlsString = formData.get('videoUrls');
        const videoUrls = videoUrlsString
            ? videoUrlsString.split(',').map(url => url.trim()).filter(url => url)
            : [];

        const bookData = {
            id: bookId || Date.now(),
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            fullDescription: formData.get('fullDescription'),
            author: formData.get('author'),
            price: formData.get('price'),
            isbn: formData.get('isbn'),
            pages: formData.get('pages'),
            publisher: formData.get('publisher'),
            year: formData.get('year'),
            link: formData.get('link'),
            cover: this.coverFile,
            documents: this.documentFiles,
            videos: this.videoFiles,
            videoUrls: videoUrls,
            images: this.imageFiles
        };

        if (bookId) {
            // Update existing book
            const index = this.books.findIndex(b => b.id == bookId);
            if (index !== -1) {
                // Preserve existing cover if no new one uploaded
                if (!this.coverFile) {
                    bookData.cover = this.books[index].cover;
                }
                this.books[index] = bookData;
            }
        } else {
            // Add new book
            this.books.push(bookData);
        }

        this.saveBooks();
        this.renderBooksList();
        this.hideBookForm();

        // Show success message
        this.showNotification('Buch erfolgreich gespeichert!', 'success');
    }

    // Edit book
    editBook(bookId) {
        this.showBookForm(bookId);
    }

    // Delete book
    deleteBook(bookId) {
        if (confirm('Möchten Sie dieses Buch wirklich löschen?')) {
            this.books = this.books.filter(b => b.id != bookId);
            this.saveBooks();
            this.renderBooksList();
            this.showNotification('Buch erfolgreich gelöscht!', 'success');
        }
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#40E0D0' : '#ff4444'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Setup event listeners
    setupEventListeners() {
        // Add book button
        const addBookBtn = document.getElementById('addBookBtn');
        if (addBookBtn) {
            addBookBtn.addEventListener('click', () => this.showBookForm());
        }

        // Cancel button
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.hideBookForm());
        }

        // Form submit
        const form = document.getElementById('bookDataForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.set('bookId', document.getElementById('bookId').value);
                formData.set('title', document.getElementById('bookTitle').value);
                formData.set('category', document.getElementById('bookCategory').value);
                formData.set('description', document.getElementById('bookDescription').value);
                formData.set('fullDescription', document.getElementById('bookFullDescription').value);
                formData.set('author', document.getElementById('bookAuthor').value);
                formData.set('price', document.getElementById('bookPrice').value);
                formData.set('isbn', document.getElementById('bookISBN').value);
                formData.set('pages', document.getElementById('bookPages').value);
                formData.set('publisher', document.getElementById('bookPublisher').value);
                formData.set('year', document.getElementById('bookYear').value);
                formData.set('link', document.getElementById('bookLink').value);
                formData.set('videoUrls', document.getElementById('videoUrls').value);

                await this.saveBook(formData);
            });
        }

        // Cover upload
        const coverInput = document.getElementById('bookCover');
        if (coverInput) {
            coverInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleCoverUpload(e.target.files[0]);
                }
            });
        }

        // Documents upload
        const documentsInput = document.getElementById('bookDocuments');
        if (documentsInput) {
            documentsInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFilesUpload(Array.from(e.target.files), 'documents');
                }
            });
        }

        // Videos upload
        const videosInput = document.getElementById('bookVideos');
        if (videosInput) {
            videosInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFilesUpload(Array.from(e.target.files), 'videos');
                }
            });
        }

        // Images upload
        const imagesInput = document.getElementById('bookImages');
        if (imagesInput) {
            imagesInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFilesUpload(Array.from(e.target.files), 'images');
                }
            });
        }
    }
}

// Initialize admin when DOM is ready
let bookAdmin;
document.addEventListener('DOMContentLoaded', () => {
    bookAdmin = new BookAdmin();
});
