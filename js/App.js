/** Book Library App with Js */

/** Library */
let library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
/** Method to delete the book */
Book.prototype.setRead = function(read) {
        this.read = read
    }
    /** Method to add the book */
function addBook(newBook) {
    library.push(newBook)
}

/** variable to access the button id */
let addBookButton = document.getElementById('addBookButton')
let newBookForm = document.forms[0]

/** function to insert the data into the table */
function showBook(newBook) {
    console.log(newBook)
    let table = document.getElementById("table-data")
    let row = document.createElement('tr')
    let th = document.createElement('th')
    th.innerHTML = 1
    let td1 = document.createElement('td')
    td1.innerHTML = newBook.title
    let td2 = document.createElement('td')
    td2.innerHTML = newBook.author
    let td3 = document.createElement('td')
    td3.innerHTML = newBook.pages
    let td4 = document.createElement('td')
    td4.innerHTML = newBook.read
    row.appendChild(th)
    row.appendChild(td1)
    row.appendChild(td2)
    row.appendChild(td3)
    row.appendChild(td4)
    table.appendChild(row)


}

/** variable to add listeners to the new book */
newBookForm.addEventListener('submit', function(event) {

    event.preventDefault();
    event.stopPropagation();
    var title = newBookForm['title'].value
    var author = newBookForm['author'].value
    var pages = newBookForm['pages'].value
    var read = newBookForm['read'].checked
    if (read) {
        read = "read"
    } else {
        read = "not-read"
    }
    let newBook = new Book(title, author, pages, read)
    addBook(newBook)
    showBook(newBook)
    console.log(library)
});