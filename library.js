//theme selector
function setTheme(){
  const root = document.documentElement;
  const theme = root.className  === 'dark' ? 'light' : 'dark';
  root.className = theme;

  if (theme === "dark"){
    document.querySelector('.theme-toggle').textContent = `Light Mode`;
  }else{
    document.querySelector('.theme-toggle').textContent = `Dark Mode`;
  }
  
}
document.querySelector('.theme-toggle').addEventListener('click', setTheme)

//main code
const myLibrary = [
  {title: 'Harry Potter', author: 'Greg Graham', pageNum: '512', readBook: 'on'}

];

addBtn = document.getElementById("addBtn"); //add button
dialog = document.getElementById("dialogForm"); //dialog
cancelBtn = document.getElementById("cancelBtn");
confirmBtn = document.getElementById("confirmBtn");
mainForm = document.forms["myForm"];
bookNum = document.getElementById("numBook");
fin_book = document.getElementById("finRead");
still_read = document.getElementById("stillRead");
booksCard = document.getElementById("Books");

function Book(title, author, pageNum, readBook){
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.readBook = readBook;
    this.info = function(){
        return (`${title} by ${author}, ${pageNum} pages, ${readBook}`)
    }
}

function addBookToLibrary() {
  // do stuff here
  b_title = mainForm["title"].value;
  b_author = mainForm["author"].value;
  b_pageNum = mainForm["pageNum"].value;
  b_readBook = mainForm["read"].value;

  const newBook = new Book(b_title,b_author,b_pageNum,b_readBook);
  myLibrary.push(newBook);
  updateBookNum();
  console.log(myLibrary); //check contents of myLibrary
  
}

addBtn.addEventListener('click',() => {
  dialog.showModal(); //show dialog
})

cancelBtn.addEventListener('click', () => {
  event.preventDefault();
  dialog.close(); //close dialog
  mainForm.reset(); //reset form
})

confirmBtn.addEventListener('click',() => {
  event.preventDefault();
  addBookToLibrary();
  dialog.close(); //close dialog
  mainForm.reset(); //reset form
})

function updateBookNum() {
  bookNum.innerHTML = `Number Of Books: ${myLibrary.length}`
}

function addNewCard() {
  newDiv = document.createElement("div")
  newDiv.className = "book";
  
}