/** Book Library App with Js */
let table = document.getElementById("table-data")
    /** Library */
let library = []

function Book(title, author, pages, read) {
    this.id = title.toLowerCase().split(' ').join('-') + "-" + author.toLowerCase().split(' ').join('-')
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.addedToView = false


}
/** Method to delete the book */


/** Method to add the book */
function addBook(newBook) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].id === newBook.id) {
            alert('Book Already Exist')
            return
        }
    }
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
    row.setAttribute('id', newBook.id)

    let td1 = document.createElement('td')
    td1.innerHTML = newBook.title
    let td2 = document.createElement('td')
    td2.innerHTML = newBook.author
    let td3 = document.createElement('td')
    td3.innerHTML = newBook.pages
    let td4 = document.createElement('td')
    let switch_button = document.createElement('div')
    switch_button.className='switch'
    if(newBook.read){
        switch_button.className='switch active'
    }
    let switch_button_cursor = document.createElement('div')
    switch_button_cursor.className='cursor'
    switch_button.appendChild(switch_button_cursor)
    td4.appendChild(switch_button)
    let td5 = document.createElement('td')
    let button = document.createElement('div')
    button.className = 'btn btn-danger btn-sm removeBook'
    button.innerHTML = "Remove"
    
   
    
    td5.appendChild(button)
    row.appendChild(td1)
    row.appendChild(td2)
    row.appendChild(td3)
    row.appendChild(td4)
    row.appendChild(td5)
    table.appendChild(row)


}

function LoopBooks() {
    for (var i = 0; i < library.length; i++) {
        var currentBook = library[i]
        if (!currentBook.addedToView) {
            addBookToView(library[i])
            currentBook.addedToView = true
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
        read = true
    } else {
        read = false
    }
    let newBook = new Book(title, author, pages, read)
    addBook(newBook)

    console.log(library)
});

newBookFormButton.addEventListener('click', function() {
    toggleFormContainer()
})



function toggleFormContainer() {
    formContainer.classList.toggle('active')
    newBookForm.classList.toggle('active')
    newBookFormButton.classList.toggle('active')
}

table.addEventListener('click', function(e) {

    if (e.target.classList.contains('removeBook')) {
        let id = e.target.parentNode.parentNode.id
        removeBook(id)

    }

    if (e.target.classList.contains('switch')) {
        e.target.classList.toggle('active')
        let id = e.target.parentNode.parentNode.id
        togglebookRead(id)
    }
    if (e.target.classList.contains('cursor')) {
        e.target.parentNode.classList.toggle('active')
        let id = e.target.parentNode.parentNode.parentNode.id
        togglebookRead(id)
    }


    if (e.target.classList.contains('readBook')) {
        alert('readBook CLICKED');
    }
})

function removeBook(id) {
    row = document.getElementById(id)
    row.remove()
    for (let i = 0; i < library.length; i++) {
        var currentBook = library[i]
        if (currentBook.id === id) {
            library.splice(i, 1)
            console.log(library)
        }
    }


}

var switch_toggle = document.querySelector('.switch')
 switch_toggle.addEventListener('click', function(e){
    switch_toggle.classList.toggle('active')}

)

function togglebookRead(id){
    for (let i = 0; i < library.length; i++) {
        var currentBook = library[i]
        if (currentBook.id === id) {
            library[i].read = !library[i].read
            console.log(library)
            return
        }
    }
}
