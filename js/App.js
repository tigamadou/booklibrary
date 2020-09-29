/** Library Book App */

const LibraryApp = () => {
  const table = document.getElementById('table-data');
  const newBookFormButton = document.getElementById('newBookFormButton');
  const formContainer = document.getElementById('formContainer');
  const cancelFormContainer = document.getElementById('cancelFormContainer');
  const newBookForm = document.forms[0];
  const library = [];

  const Book = (title, author, pages, read) => {
    const id = `${title.toLowerCase().split(' ').join('-')}-${author.toLowerCase().split(' ').join('-')}`;
    const addedToView = false;
    return {
      id, title, author, pages, read, addedToView,
    };
  };
  /** function to insert the data into the table */
  const render = (newBook) => {
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
    table.appendChild(row);
  };

  const LoopBooks = () => {
    for (let i = 0; i < library.length; i += 1) {
      const currentBook = library[i];
      if (!currentBook.addedToView) {
        render(library[i]);
        currentBook.addedToView = true;
      }
    }
  };


  /** Method to add the book */
  const addBookToLibrary = (newBook) => {
    for (let i = 0; i < library.length; i += 1) {
      if (library[i].id === newBook.id) {
        return;
      }
    }
    library.push(newBook);
    LoopBooks();
  };
  const toggleFormContainer = () => {
    formContainer.classList.toggle('active');
    newBookForm.classList.toggle('active');
    newBookFormButton.classList.toggle('active');
  };
  const removeBook = (id) => {
    const row = document.getElementById(id);
    row.remove();
    for (let i = 0; i < library.length; i += 1) {
      const currentBook = library[i];
      if (currentBook.id === id) {
        library.splice(i, 1);
      }
    }
  };

  const togglebookRead = (id) => {
    for (let i = 0; i < library.length; i += 1) {
      const currentBook = library[i];
      if (currentBook.id === id) {
        library[i].read = !library[i].read;
        return;
      }
    }
  };
  
  return () => {
    /** variable to add listeners to the new book */
    newBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const title = newBookForm.title.value;
      const author = newBookForm.author.value;
      const pages = newBookForm.pages.value;
      let read = newBookForm.read.checked;
      if (read) {
        read = true;
      } else {
        read = false;
      }
      const newBook = Book(title, author, pages, read);
      addBookToLibrary(newBook);
    });

    newBookFormButton.addEventListener('click', () => {
      toggleFormContainer();
    });
    cancelFormContainer.addEventListener('click', () => {
      toggleFormContainer();
    });


    table.addEventListener('click', (e) => {
      if (e.target.classList.contains('removeBook')) {
        const { id } = e.target.parentNode.parentNode;
        removeBook(id);
      }

      if (e.target.classList.contains('switch')) {
        e.target.classList.toggle('active');
        const { id } = e.target.parentNode.parentNode;
        togglebookRead(id);
      }
      if (e.target.classList.contains('cursor')) {
        e.target.parentNode.classList.toggle('active');
        const { id } = e.target.parentNode.parentNode.parentNode;
        togglebookRead(id);
      }
    });
  };
};


const App = LibraryApp();
App();
