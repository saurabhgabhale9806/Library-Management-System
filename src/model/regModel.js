let conn = require("../config/db.js");

exports.addStudent = (name, email, password) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'member')";
    conn.query(sql, [name, email, password], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
};

exports.searchAllStudent = (searchValue) => {
  return new Promise((res, rej) => {
    let value = "%" + searchValue + "%";
    conn.query(
      "SELECT * FROM users WHERE LOWER(name) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)",
      [value, value],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      }
    );
  });
};

exports.deleteStudents = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      conn.query("SELECT * FROM users", (err1, result1) => {
        if (err1) {
          return reject(err1);
        } else {
          resolve(result1);
        }
      });
    });
  });
};

exports.addCategories = (name) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO categories(name) VALUES(?)";
    conn.query(sql, [name], (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      conn.query("SELECT * FROM categories", (err1, result1) => {
        if (err1) {
          return reject(err1);
        } else {
          resolve(result1);
        }
      });
    });
  });
};

exports.searchAllCategories = (searchValue) => {
  return new Promise((res, rej) => {
    let value = "%" + searchValue + "%";
    conn.query(
      "SELECT * FROM categories WHERE LOWER(name) LIKE LOWER(?)",
      [value, value],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      }
    );
  });
};

exports.updateStudent = (name, email, password, id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.getbeforeupdateCat = (id) => {
  return new Promise((res, rej) => {
    conn.query("SELECT * FROM categories WHERE id = ?", [id], (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

exports.getafterupdateCat = (id, name) => {
  return new Promise((res, rej) => {
    conn.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [name, id],
      (err, result) => {
        if (err) rej(err);
        else res(result);
      }
    );
  });
};

exports.getViewcategorie = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM categories", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.addBook = (
  title,
  author,
  publisher,
  isbn,
  category,
  total_copies,
  available_copies,
  status,
  image
) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO books (title, author, publisher, isbn, category, total_copies, available_copies, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        author,
        publisher,
        isbn,
        category,
        total_copies,
        available_copies,
        status,
        image,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.getAllBooks = () => {
  return new Promise((res, rej) => {
    conn.query(
      "SELECT title, author, publisher, category, total_copies, available_copies, status, image FROM books",
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          console.log(result);
          res(result);
        }
      }
    );
  });
};

exports.viewBooks = () => {
  return new Promise((res, rej) => {
    conn.query("Select * from books", (err, result) => {
      if (err) {
        rej(err);
      } else {
        console.log(result);
        res(result);
      }
    });
  });
};

exports.deleteBooks = (id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      conn.query("SELECT * FROM books", (err1, result1) => {
        if (err1) {
          return reject(err1);
        } else {
          resolve(result1);
        }
      });
    });
  });
};

exports.getbeforeupdateBooks = (id) => {
  return new Promise((res, rej) => {
    conn.query("SELECT * FROM books WHERE id = ?", [id], (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

exports.getafterupdateBooks = (id, title, author, publisher, isbn, category, total_copies, available_copies, status, image) => {
  return new Promise((res, rej) => {
    conn.query(
      "UPDATE books SET title = ?, author = ?, publisher = ?, isbn = ?, category = ?, total_copies = ?, available_copies = ?, status = ?, image = ? WHERE id = ?",
      [title, author, publisher, isbn, category, total_copies, available_copies, status, image, id],
      (err, result) => {
        if (err) rej(err);
        else res(result);
      }
    );
  });
};

exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT name FROM categories", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};  

exports.issueBook=(user_id,book_id,issue_date,return_date,status)=>{
    return new Promise((resolve, reject) => {
          
             conn.query("insert into issue_details values ('0',?,?,?,?,?)",[book_id,user_id,issue_date,return_date,status],(err,result)=>{  
                if (err) {
                return reject(err); 
                }
                else{
                    resolve(result);
                }
            });
   
    })
}

exports.searchName = (name) => {
  return new Promise((resolve, reject) => {
    const searchPattern = `%${name}%`;
    conn.query("SELECT * FROM users WHERE name LIKE ?", [searchPattern], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  }); 
};

exports.searchbook = (category) => {
  return new Promise((resolve, reject) => {
    const searchPattern = `${category}%`; 
    conn.query("SELECT * FROM books WHERE category LIKE ?", [searchPattern], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


