let myLibrary = [
  { title: "Test1", author: "Auth1", pages: 320, read: false },
  { title: "Test2", author: "Auth2", pages: 412, read: true },
  { title: "Test3", author: "Auth3", pages: 128, read: false },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

// Load Books to DOM
window.addEventListener("load", loadBooks());
function loadBooks() {
  myLibrary.forEach((item, index) => {
    document.getElementById("books").innerHTML += `
    <div class="card">
    <h3>${item.title}</h3>
    <p>${item.author}</p>
    <p>Pages: ${item.pages}</p>
    <p>Read? ${item.read}<button class="toggleRead" onclick="readStatusChange(${index})">Change state</button></p>
    <p><button class="delete" onclick="deleteBook(${index})">Delete</button></p>
    </div>
    `;
  });
}

// Reload on change
function reloadBooks() {
  document.getElementById("books").innerHTML = ``;
  loadBooks();
}

// Show the Form to add a new Book
function showAddBookForm() {
  document.getElementById("addBookFormWrapper").classList.toggle("displayNone");
}

// Add new Book function
function addBookToLibrary() {
  let bookTitle = document.querySelector("#title").value;
  let bookAuthor = document.querySelector("#author").value;
  let bookPages = document.querySelector("#pages").value;
  let bookRead = document.querySelector("#read").checked;
  let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  myLibrary.push(newBook);
  document.getElementById("addBookForm").reset();
  reloadBooks();
}

// Delete one Book function
function deleteBook(i) {
  myLibrary.splice(i, 1);
  reloadBooks();
}

// Change read status
function readStatusChange(i) {
  myLibrary[i].read = !myLibrary[i].read;
  reloadBooks();
}
