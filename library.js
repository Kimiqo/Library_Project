// Theme selector
function setTheme(){
  const root = document.documentElement;
  const theme = root.className === 'dark' ? 'light' : 'dark';
  root.className = theme;

  if (theme === "dark") {
    document.querySelector('.theme-toggle').textContent = `Light Mode`;
  } else {
    document.querySelector('.theme-toggle').textContent = `Dark Mode`;
  }
}
document.querySelector('.theme-toggle').addEventListener('click', setTheme);

// Main code
const myLibrary = [];

window.onload = () => {
  updateStats();
};

const addBtn = document.getElementById("addBtn").querySelector('button'); // Add button inside the div
const dialog = document.getElementById("dialogForm"); // Dialog
const cancelBtn = document.getElementById("cancelBtn"); // Cancel button
const confirmBtn = document.getElementById("confirmBtn"); // Confirm button
const mainForm = document.forms["myForm"]; // Main form
const bookNum = document.getElementById("numBook"); // Number of books element
const finBook = document.getElementById("finRead"); // Finished reading element
const stillRead = document.getElementById("stillRead"); // Still reading element
const booksCard = document.getElementById("books"); // Books section

class Book {
  constructor(title, author, pageNum, readBook) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.readBook = readBook;
  }

  // Toggle read status method for Book prototype
  toggleReadStatus() {
    this.readBook = !this.readBook;
  }
}

function addBookToLibrary() {
  const b_title = mainForm["title"].value;
  const b_author = mainForm["author"].value;
  const b_pageNum = mainForm["pageNum"].value;
  const b_readBook = mainForm["read"].checked;

  const newBook = new Book(b_title, b_author, b_pageNum, b_readBook);
  myLibrary.push(newBook);
  updateStats();
  addNewCard(newBook);

  console.log(myLibrary); // Check contents of myLibrary
}

addBtn.addEventListener('click', () => {
  dialog.showModal(); // Show dialog
});

cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.close(); // Close dialog
  mainForm.reset(); // Reset form
});

confirmBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
  dialog.close(); // Close dialog
  mainForm.reset(); // Reset form
});

function updateStats() {
  bookNum.innerHTML = `Number Of Books: ${myLibrary.length}`;
  const finishedBooks = myLibrary.filter(book => book.readBook).length;
  finBook.innerHTML = `Finished: ${finishedBooks}`;
  stillRead.innerHTML = `Still Reading: ${myLibrary.length - finishedBooks}`;
}

function addNewCard(book) {
  // Display card
  const newDiv = document.createElement("div");
  newDiv.className = "book";
  newDiv.innerHTML = `
    <h5>Title: ${book.title}</h5>
    <p>Author: ${book.author}</p>
    <p>Number Of Pages: ${book.pageNum}</p>
    <p>Finished Reading: ${book.readBook ? 'Yes' : 'No'}</p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onclick="removeBook(this)">
      <title>delete</title>
      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
    </svg>
    <button class="toggle">Change Read Status</button>
  `;
  booksCard.appendChild(newDiv);

  const toggleBtn = newDiv.querySelector('.toggle');
  toggleBtn.addEventListener('click', () => {
    book.toggleReadStatus();
    updateBookStatus(newDiv, book.readBook);
  });
}

function updateBookStatus(cardDiv, readStatus) {
  const readStatusElem = cardDiv.querySelector('p:nth-child(4)');
  readStatusElem.innerHTML = `Finished Reading: ${readStatus ? 'Yes' : 'No'}`;
  updateStats();
}

function removeBook(svgElement) {
  const bookDiv = svgElement.parentElement;
  const title = bookDiv.querySelector('h5').textContent.replace('Title: ', '');
  const index = myLibrary.findIndex(book => book.title === title);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  bookDiv.parentElement.removeChild(bookDiv);
  updateStats();
}
