let conn = require("../config/db.js");

exports.addStudent = (name, email, password) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'member')";
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
            let value = '%' + searchValue + '%';
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
                }
                else{
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
                }
                else{
                  resolve(result1);
                }
            });
        });
    });
};

exports.searchAllCategories = (searchValue) => {
        return new Promise((res, rej) => {  
            let value = '%' + searchValue + '%';
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

