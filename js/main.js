let books = [];
const booksSection = document.getElementById('books');
const form = document.getElementById('book_form');

function saveBooks() {
  const booksList = JSON.stringify(books);
  localStorage.setItem('books', booksList);
}
function createBookElements() {
  booksSection.replaceChildren();
  if (books.length > 0) {
    const booksList = document.createElement('ul');
    booksList.style.listStyleType = 'none';
    booksList.style.margin = '0';
    booksList.style.padding = '0';
    books.map((b) => {
    console.log(b);
    const bookCard = document.createElement('li');
    const titleElement = document.createElement('h3');
    titleElement.style.padding = '0';
    titleElement.style.margin = '0';
    const titleText = document.createTextNode(b.title);
    titleElement.appendChild(titleText);
    bookCard.appendChild(titleElement);
    const authorElement = document.createElement('h4');
    authorElement.style.margin = '0';
    const authorText = document.createTextNode(b.author);
    authorElement.appendChild(authorText);
    bookCard.append(authorElement);
    const removeBtn = document.createElement('button');
    const btnText = document.createTextNode('Remove');
    removeBtn.onclick = function () {
    	removeBook(b.id);
    };
    removeBtn.appendChild(btnText);
    bookCard.appendChild(removeBtn);
    booksList.appendChild(bookCard);
    const divider = document.createElement('hr');
    booksList.appendChild(divider);
    return booksList;
    });
    booksSection.appendChild(booksList);
  } else {
    const noBooks = document.createElement('h3');
    const noBooksText = document.createTextNode('There are no books available');
    noBooks.appendChild(noBooksText);
    booksSection.appendChild(noBooks);
  }
}

function addBook(title, author) {
  const book = {
    title,
    author,
    id: Date.now(),
  };
  books.unshift(book);
  saveBooks();
  createBookElements();
}

function removeBook(id) {
  books = books.filter((b) => b.id !== id);
  saveBooks();
  createBookElements();
}

function getAddedBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBook(title, author);
  form.reset();
}

function initStorage() {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
    createBookElements();
  } else {
    createBookElements();
  }
}

initStorage();
form.addEventListener('submit', getAddedBook);