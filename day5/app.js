const bookTitle = document.getElementById('book-title');
const bookWriter = document.getElementById('book-writer');
const submitButton = document.getElementById('submitBtn');
const toastMessage = document.querySelector('.toast-message');
const table = document.querySelector('table');
const tableBody = document.querySelector('tbody');
const input = document.querySelector('input');

let books = [];

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (bookTitle.value === '' || bookWriter.value === '') {
    toastMessage.classList.add('active');
    setTimeout(() => {
      toastMessage.classList.remove('active');
    }, 1000);
  } else {
    const newBook = {
      title: bookTitle.value,
      writer: bookWriter.value,
    };
    books.push(newBook);

    renderBooks();
  }

  input.focus();
  bookTitle.value = '';
  bookWriter.value = '';
});

const renderBooks = () => {
  tableBody.innerHTML = '';
  books.forEach((book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td></td>
      <td>${book.writer}</td>
      <td>
        <button class="deleteBtn" data-index="${index}">
          <i class="fa-regular fa-rectangle-xmark"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  deleteBookList();
};

const deleteBookList = () => {
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      deleteBook(index);
    });
  });
};

const deleteBook = (index) => {
  books.splice(index, 1);
  renderBooks();
};
