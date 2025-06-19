function searchBooks(query) {
  const filter = query.toLowerCase();
  const books = document.querySelectorAll('.book-item');

  books.forEach((book) => {
    const description = book.querySelector('.book-description');
    const categoryMatch = description.innerText.toLowerCase().includes(`category:`) &&
                          description.innerText.toLowerCase().includes(filter);

    if (categoryMatch || filter === '') {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
}