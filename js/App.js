/** Book Library App with Js */

/** Library */
let library=[]

function Book(title,author,pages,read){
    this.title =title
    this.author = author
    this.pages = pages
    this.read = read
}
/** Method to delete the book */
Book.prototype.setRead = function(read){
    this.read = read
}

function addBook(newBook){
    library.push(newBook)
}
// Create the book Bible
let bible = new Book('The Holly Bible','Jesus',3000,'not-read')

// Add bible tot he library
addBook(bible)

// Create the book little Mairmaid
let LittleMermaid= new Book('The little mermaid','Disney',300,'not-read')

// Set the book as read
LittleMermaid.setRead('read')

// Add the book to the library
addBook(LittleMermaid)


// Print the library
console.log(library)