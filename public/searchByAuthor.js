// searchByAuthor.js

function searchbyAuthor(query) {
  const filter = query.toLowerCase();
  const books = document.querySelectorAll('.book-item');

  books.forEach((book) => {
    const description = book.querySelector('.book-description');
    const authorLine = Array.from(description.innerText.split('\n'))
      .find(line => line.toLowerCase().includes('author:'));

    const authorName = authorLine ? authorLine.split(':')[1].trim().toLowerCase() : '';

    if (authorName.includes(filter) || filter === '') {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
}
