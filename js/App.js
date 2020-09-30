/** Library Book App */

class LibraryApp {
  newBookForm = document.forms[0];

  constructor() {
    this.table = document.getElementById('table-data');

    this.newBookFormButton = document.getElementById('newBookFormButton');

    this.formContainer = document.getElementById('formContainer');

    this.cancelFormContainer = document.getElementById('cancelFormContainer');


    this.library = [];
  }

  run = () => {
    /** variable to add listeners to the new book */
    this.newBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const title = this.newBookForm.title.value;
      const author = this.newBookForm.author.value;
      const pages = this.newBookForm.pages.value;
      let read = this.newBookForm.read.checked;
      if (read) {
        read = true;
      } else {
        read = false;
      }
      const newBook = this.Book(title, author, pages, read);
      this.addBookToLibrary(newBook);
    });

    this.newBookFormButton.addEventListener('click', () => {
      this.toggleFormContainer();
    });
    this.cancelFormContainer.addEventListener('click', () => {
      this.toggleFormContainer();
    });


    this.table.addEventListener('click', (e) => {
      if (e.target.classList.contains('removeBook')) {
        const { id } = e.target.parentNode.parentNode;
        this.removeBook(id);
      }

      if (e.target.classList.contains('switch')) {
        e.target.classList.toggle('active');
        const { id } = e.target.parentNode.parentNode;
        this.togglebookRead(id);
      }
      if (e.target.classList.contains('cursor')) {
        e.target.parentNode.classList.toggle('active');
        const { id } = e.target.parentNode.parentNode.parentNode;
        this.togglebookRead(id);
      }
    });
  }

  Book = (title, author, pages, read) => {
    const id = `${title.toLowerCase().split(' ').join('-')}-${author.toLowerCase().split(' ').join('-')}`;
    const addedToView = false;
    return {
      id, title, author, pages, read, addedToView,
    };
  };

  /** function to insert the data into the table */
  render = (newBook) => {
    const row = document.createElement('tr');
    row.setAttribute('id', newBook.id);

    const td1 = document.createElement('td');
    td1.innerHTML = newBook.title;
    const td2 = document.createElement('td');
    td2.innerHTML = newBook.author;
    const td3 = document.createElement('td');
    td3.innerHTML = newBook.pages;
    const td4 = document.createElement('td');
    const switchButton = document.createElement('div');
    switchButton.className = 'switch';
    if (newBook.read) {
      switchButton.className = 'switch active';
    }
    const switchButtonCursor = document.createElement('div');
    switchButtonCursor.className = 'cursor';
    switchButton.appendChild(switchButtonCursor);
    td4.appendChild(switchButton);
    const td5 = document.createElement('td');
    const button = document.createElement('div');
    button.className = 'btn btn-danger btn-sm removeBook';
    button.innerHTML = 'Remove';
    td5.appendChild(button);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    this.table.appendChild(row);
  };

  LoopBooks = () => {
    for (let i = 0; i < this.library.length; i += 1) {
      const currentBook = this.library[i];
      if (!currentBook.addedToView) {
        this.render(this.library[i]);
        currentBook.addedToView = true;
      }
    }
  };


  /** Method to add the book */
  addBookToLibrary = (newBook) => {
    for (let i = 0; i < this.library.length; i += 1) {
      if (this.library[i].id === newBook.id) {
        return;
      }
    }
    this.library.push(newBook);
    this.LoopBooks();
  };

  toggleFormContainer = () => {
    this.formContainer.classList.toggle('active');
    this.newBookForm.classList.toggle('active');
    this.newBookFormButton.classList.toggle('active');
  };

  removeBook = (id) => {
    const row = document.getElementById(id);
    row.remove();
    for (let i = 0; i < this.library.length; i += 1) {
      const currentBook = this.library[i];
      if (currentBook.id === id) {
        this.library.splice(i, 1);
      }
    }
  };

  togglebookRead = (id) => {
    for (let i = 0; i < this.library.length; i += 1) {
      const currentBook = this.library[i];
      if (currentBook.id === id) {
        this.library[i].read = !this.library[i].read;
        return;
      }
    }
  };
}


const App = new LibraryApp();
App.run();