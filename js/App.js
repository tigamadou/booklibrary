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


let addBookButton = document.getElementById('addBookButton')
let newBookForm = document.forms[0]

addBookButton.addEventListener('click',function(){
    var name = newBookForm['name'].value
    var author = newBookForm['author'].value
    var pages = newBookForm['pages'].value
    var read = newBookForm['read'].checked    
   if(read){
        read="read"
   }else{
        read="not-read"
   }
    let newBook = new Book(name,author,pages,read)
    addBook(newBook)
    console.log(library)
});