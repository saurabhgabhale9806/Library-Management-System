 document.getElementById('issue_date').addEventListener('change', function () {
      const issueDate = new Date(this.value);
      if (!isNaN(issueDate.getTime())) {
        issueDate.setDate(issueDate.getDate() + 7);
        const yyyy = issueDate.getFullYear();
        const mm = String(issueDate.getMonth() + 1).padStart(2, '0');
        const dd = String(issueDate.getDate()).padStart(2, '0');
        document.getElementById('return_date').value = `${yyyy}-${mm}-${dd}`;
      }
    });

    // AJAX: Search Users
    const userSearch = document.getElementById('userSearch');
    const userSuggestions = document.getElementById('userSuggestions');
    const userIdInput = document.getElementById('user_id');

    userSearch.addEventListener('input', async function () {
      const q = this.value.trim();
      if (q.length < 2) {
        userSuggestions.innerHTML = '';
        return;
      }

      try {
        const res = await fetch(`/admin/api/users/search?q=${encodeURIComponent(q)}`);
        const users = await res.json();

        userSuggestions.innerHTML = '';
        users.forEach(user => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'list-group-item list-group-item-action';
          item.textContent = `${user.name} (${user.email})`;
          item.onclick = () => {
            userSearch.value = `${user.name} (${user.email})`;
            userIdInput.value = user.id;
            userSuggestions.innerHTML = '';
          };
          userSuggestions.appendChild(item);
        });
      } catch (err) {
        console.error('User search error:', err);
      }
    });

    // AJAX: Search Books by Category or Title
    const categorySearch = document.getElementById('categorySearch');
    const categorySuggestions = document.getElementById('categorySuggestions');
    const bookIdInput = document.getElementById('book_id');

    categorySearch.addEventListener('input', async function () {
      const q = this.value.trim();
      if (q.length < 2) {
        categorySuggestions.innerHTML = '';
        return;
      }

      try {
        const res = await fetch(`/admin/api/category/search?q=${encodeURIComponent(q)}`);
        const books = await res.json();

        categorySuggestions.innerHTML = '';
        books.forEach(book => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'list-group-item list-group-item-action';
          item.textContent = `${book.title} (${book.isbn})`;
          item.onclick = () => {
            categorySearch.value = `${book.title} (${book.isbn})`;
            bookIdInput.value = book.id;
            categorySuggestions.innerHTML = '';
          };
          categorySuggestions.appendChild(item);
        });
      } catch (err) {
        console.error('Book search error:', err);
      }
    });