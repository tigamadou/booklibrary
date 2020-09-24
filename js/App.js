/** Book Library App with Js */
let table = document.getElementById("table-data")
/** Library */
let library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.addedToView = false

    
}
/** Method to delete the book */


    /** Method to add the book */
function addBook(newBook) {
    library.push(newBook)
    LoopBooks()
}

/** variable to access the button id */
let addBookButton = document.getElementById('addBookButton')
let newBookFormButton = document.getElementById('newBookFormButton')
let formContainer = document.getElementById('formContainer')
let newBookForm = document.forms[0]

/** function to insert the data into the table */
function addBookToView(newBook) {  
    
    let row = document.createElement('tr')
    let td1 = document.createElement('td')
    td1.innerHTML = newBook.title
    let td2 = document.createElement('td')
    td2.innerHTML = newBook.author
    let td3 = document.createElement('td')
    td3.innerHTML = newBook.pages
    let td4 = document.createElement('td')
    td4.innerHTML = newBook.read
    let td5 = document.createElement('td')

    let button = document.createElement('div')
    button.className = 'btn btn-danger btn-sm removeBook'
    button.innerHTML = "Remove"
    let button2 = document.createElement('div')
    button2.className = 'btn btn-link btn-sm readBook'
    button2.innerHTML = "Mark as Read"
    td5.appendChild(button)
    td5.appendChild(button2)

    row.appendChild(td1)
    row.appendChild(td2)
    row.appendChild(td3)
    row.appendChild(td4)
    row.appendChild(td5)
    table.appendChild(row)


}

function LoopBooks(){
    for(var i=0;i<library.length;i++){
        var currentBook = library[i]
        if(!currentBook.addedToView){
            addBookToView(library[i])
            currentBook.addedToView= true
        }
    }
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
    
    console.log(library)
});

newBookFormButton.addEventListener('click',function(){
    toggleFormContainer()
})


function toggleFormContainer(){
    formContainer.classList.toggle('active')
}

table.addEventListener('click',function(e){
    if(e.target.classList.contains('removeBook')) {
		alert('removeBook CLICKED');
    }
    if(e.target.classList.contains('readBook')) {
		alert('readBook CLICKED');
	}
})