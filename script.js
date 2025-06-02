// Array to store all books
let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Add toggleRead method to Book prototype
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

// Function to remove a book from the library
function removeBook(bookId) {
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    displayBooks();
}

// Function to create a book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.id = book.id;

    card.innerHTML = `
        <h3>${book.title}</h3>
        <div class="book-info">by ${book.author}</div>
        <div class="book-info">${book.pages} pages</div>
        <div class="read-status ${book.read ? 'read' : 'unread'}">
            ${book.read ? 'Read' : 'Not Read'}
        </div>
        <div class="book-actions">
            <button class="btn toggle-read" onclick="handleToggleRead('${book.id}')">
                ${book.read ? '📖 Mark Unread' : '✓ Mark Read'}
            </button>
            <button class="btn remove-book" onclick="handleRemoveBook('${book.id}')">
                ❌ Remove
            </button>
        </div>
    `;

    return card;
}

// Function to display all books
function displayBooks() {
    const bookGrid = document.getElementById('bookGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Clear existing books
    bookGrid.innerHTML = '';

    // Show/hide empty state message
    if (myLibrary.length === 0) {
        emptyState.classList.add('visible');
        bookGrid.style.display = 'none';
    } else {
        emptyState.classList.remove('visible');
        bookGrid.style.display = 'grid';
        
        // Add all books to the grid
        myLibrary.forEach(book => {
            const bookCard = createBookCard(book);
            bookGrid.appendChild(bookCard);
        });
    }
}

// Event handler for toggling read status
function handleToggleRead(bookId) {
    const book = myLibrary.find(b => b.id === bookId);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

// Event handler for removing a book
function handleRemoveBook(bookId) {
    removeBook(bookId);
}

// Modal handling
const modal = document.getElementById('bookModal');
const newBookBtn = document.getElementById('newBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

// Show modal
newBookBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// Hide modal
function hideModal() {
    modal.classList.remove('active');
    bookForm.reset();
}

cancelBtn.addEventListener('click', hideModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    hideModal();
});

// Initialize the display
displayBooks(); 