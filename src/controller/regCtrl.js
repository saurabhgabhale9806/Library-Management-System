let regService = require("../services/regServices.js");
let regModels = require("../model/regModel.js");
const conn = require("../config/db.js");
const jwt = require("jsonwebtoken");

// HTTP Status Codes
const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
};

exports.countStudents = async (req, res) => {
  try {
    const count = await regModels.countStudents();
    res.render("adminDashboard.ejs", { count });
    console.log("Total students count:", count);
  } catch (err) {
    console.error("Error counting students:", err);
    res.status(500).json({ error: "Failed to count students" });
  }
};
exports.countCategories = async (req, res) => {
  try {
    const count = await regModels.countCategories();
    res.render("adminDashboard.ejs", { count });
    console.log("Total students count:", count);
  } catch (err) {
    console.error("Error counting students:", err);
    res.status(500).json({ error: "Failed to count students" });
  }
};

exports.countBooks = async (req, res) => {
  try {
    const count = await regModels.countBooks();
    res.render("adminDashboard.ejs", { count });
    console.log("Total students count:", count);
  } catch (err) {
    console.error("Error counting students:", err);
    res.status(500).json({ error: "Failed to count students" });
  }
};
exports.homePage = (req, res) => {
  res.render("home.ejs");
};

exports.loginPage = (req, res) => {
  console.log("Login page requested");
  res.render("login.ejs", { msg: "" });
};

exports.adminDashboard = async (req, res) => {
  try {
    const studentCount = await regModels.countStudents();
    const categoryCount = await regModels.countCategories();
    const BookCount = await regModels.countBooks();
    res.render("adminDashboard.ejs", {
      studentCount,
      categoryCount,
      BookCount,
    });
  } catch (err) {
    res
      .status(500)
      .render("error.ejs", { msg: "Error loading dashboard", code: 500 });
  }
};

exports.adminLogin = async (req, res) => {
  const adminData = {
    username: "Admin",
    password: "Admin@123",
  };
  const { username, password } = req.body;

  if (username === adminData.username && password === adminData.password) {
    // Issue JWT for admin
    const token = jwt.sign(
      { username: adminData.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.cookie("token", token, { httpOnly: true });
    try {
      const studentCount = await regModels.countStudents();
      const categoryCount = await regModels.countCategories();
      const BookCount = await regModels.countBooks();
      res.render("adminDashboard.ejs", {
        studentCount,
        categoryCount,
        BookCount,
      });
    } catch (err) {
      res
        .status(500)
        .render("error.ejs", { msg: "Error loading dashboard", code: 500 });
    }
  } else {
    res.status(STATUS.UNAUTHORIZED).render("error.ejs", {
      msg: "Invalid credentials",
      code: STATUS.UNAUTHORIZED,
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error logging out",
        code: STATUS.INTERNAL_ERROR,
      });
    }
    res.clearCookie("token");
    res.redirect("/login");
  });
};
exports.adminProfile = (req, res) => {
  const adminData = {
    username: "Admin",
    password: "Admin@123",
  };
  res.render("adminProfile.ejs", { adminData });
};

exports.aboutUs = (req, res) => {
  res.render("aboutUS.ejs");
};

exports.getAddStudent = (req, res) => {
  res.render("addStudent.ejs", { msg: "" });
};

exports.postAddStudent = async (req, res) => {
  try {
    let { name, email, password, confirm } = req.body;

    if (password.trim() !== confirm.trim()) {
      return res.status(STATUS.BAD_REQUEST).render("error.ejs", {
        msg: "Passwords do not match.",
        code: STATUS.BAD_REQUEST,
      });
    }

    const result = await regModels.addStudent(
      name.trim(),
      email.trim(),
      password.trim()
    );
    console.log(result);
    res.render("addStudent.ejs", { msg: "Student added successfully." });
  } catch (err) {
    console.error(err);
    res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
      msg: "Error saving student.",
      code: STATUS.INTERNAL_ERROR,
    });
  }
};

exports.viewAllStudents = (req, res) => {
  conn.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error fetching students.",
        code: STATUS.INTERNAL_ERROR,
      });
    }
    res.render("viewAllStudents.ejs", { data: result });
  });
};

exports.searchStud = async (req, res) => {
  try {
    const searchValue = req.query.sd;
    console.log("Received search value:", searchValue);

    const stud = await regModels.searchAllStudent(searchValue);
    console.log("Search result:", stud);

    res.json(stud);
  } catch (err) {
    console.log(err);
    res.status(STATUS.INTERNAL_ERROR).json({ error: "Something went wrong" });
  }
};

exports.deleteStudents = async (req, res) => {
  try {
    const id = parseInt(req.query.id.trim());
    const result = await regModels.deleteStudents(id);
    res.render("viewAllStudents.ejs", { data: result });
  } catch (err) {
    console.error(err);
    res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
      msg: "Error deleting student.",
      code: STATUS.INTERNAL_ERROR,
    });
  }
};

exports.errorPage = (req, res) => {
  res.render("error.ejs", {
    msg: "Something went wrong",
    code: STATUS.INTERNAL_ERROR,
  });
};

exports.loadUpdateForm = (req, res) => {
  const id = req.query.id;

  conn.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.send("Error loading form");
    }

    res.render("updateStudent", { user: result[0], msg: null });
  });
};

exports.updateStudent = (req, res) => {
  const { id, name, email, password, confirm } = req.body;

  if (password !== confirm) {
    return res.render("updateStudent.ejs", {
      user: { id, name, email },
      msg: "Passwords do not match!",
    });
  }

  regModels
    .updateStudent(name, email, password, id)
    .then(() => {
      res.redirect("/viewAllStudents");
    })
    .catch((err) => {
      let message = "Internal server error during update.";
      if (err.code === "ER_DUP_ENTRY") {
        message = "Email already exists. Please choose another.";
      }
      res.render("updateStudent.ejs", {
        user: { id, name, email },
        msg: message,
      });
    });
};

// Show all students
exports.viewAllStudents = (req, res) => {
  conn.query("SELECT * FROM users WHERE role = 'member'", (err, result) => {
    if (err) {
      return res.send("Error loading students.");
    }
    res.render("viewAllStudents", { data: result });
  });
};

exports.getAddCategories = (req, res) => {
  res.render("addCategories.ejs", { msg: "" });
};

exports.postAddCategories = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).send("Category name is required.");
    }

    const result = await regModels.addCategories(name.trim());
    console.log(result);
    res.render("addCategories", { msg: "Category added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).render({ msg: "Error saving category." });
  }
};

exports.viewAllCategories = (req, res) => {
  conn.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error fetching categories.",
        code: STATUS.INTERNAL_ERROR,
      });
    }
    res.render("viewCategories.ejs", { data: result });
  });
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = parseInt(req.query.id.trim());
    const result = await regModels.deleteCategory(id);
    res.render("viewCategories.ejs", { data: result });
  } catch (err) {
    console.error(err);
    res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
      msg: "Error deleting student.",
      code: STATUS.INTERNAL_ERROR,
    });
  }
};

exports.searchCategory = async (req, res) => {
  try {
    const searchValue = req.query.sd;
    console.log("Received search value:", searchValue);

    const stud = await regModels.searchAllCategories(searchValue);
    console.log("Search result:", stud);

    res.json(stud);
  } catch (err) {
    console.log(err);
    res.status(STATUS.INTERNAL_ERROR).json({ error: "Something went wrong" });
  }
};

exports.beforeUpdateCat = async (req, res) => {
  const idParam = req.query.id;

  if (!idParam) {
    console.error("No category ID provided in query params");
    return res.status(400).render("error.ejs", {
      code: 400,
      msg: "Category ID not provided in the request.",
    });
  }

  let id = parseInt(idParam.trim());
  console.log("cat Id ---------->", id);

  try {
    const cat = await regModels.getbeforeupdateCat(id);

    if (cat.length === 0) {
      return res.status(404).render("error.ejs", {
        code: 404,
        msg: "Category not found.",
      });
    }

    res.render("updateCategories.ejs", { cat });
  } catch (err) {
    console.error("Error fetching category for update:", err);
    res.status(500).render("error.ejs", {
      code: err.statusCode || 500,
      msg: err.message || "Failed to fetch category data for update.",
    });
  }
};

exports.afterUpdateCat = async (req, res) => {
  try {
    const id = req.body.id.trim();
    const name = req.body.name.trim();

    console.log("ID:", id);
    console.log("Name:", name);

    const result = await regModels.getafterupdateCat(id, name);
    console.log("Update result:", result);

    res.redirect("/viewCategories");
  } catch (err) {
    console.error("Update error:", err.sqlMessage || err.message || err);
    res.status(500).render("error.ejs", {
      code: err.statusCode || 500,
      msg:
        err.sqlMessage ||
        err.message ||
        "An error occurred while updating the category.",
    });
  }
};

exports.addBookForm = async (req, res) => {
  let categories = await regModels.getViewcategorie();
  res.render("addBooks.ejs", { categories, msg: "" });
};

// Handle book saving
exports.addBook = async (req, res) => {
  const {
    title,
    author,
    publisher,
    isbn,
    category,
    total_copies,
    available_copies,
    status,
  } = req.body;
  const image = "/uploads/" + req.file.filename;

  try {
    await regModels.addBook(
      title,
      author,
      publisher,
      isbn,
      category,
      total_copies,
      available_copies,
      status,
      image
    );
    const count = await regModels.countStudents();
    res.render("adminDashboard.ejs", { count });
  } catch (err) {
    console.error("Add Book Error:", err);
    res.render("error.ejs");
  }
};

exports.viewBooks = async (req, res) => {
  try {
    const books = await regModels.viewBooks();
    res.render("viewBooks.ejs", { books }); // filename should match
  } catch (err) {
    console.error(err);
    res.status(500).render("error.ejs", {
      code: 500,
      msg: "Failed to load books.",
    });
  }
};

exports.deleteBooks = async (req, res) => {
  try {
    const id = parseInt(req.query.id.trim());
    const result = await regModels.deleteBooks(id);
    res.render("viewBooks.ejs", { books: result });
  } catch (err) {
    console.error(err);
    res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
      msg: "Error deleting student.",
      code: STATUS.INTERNAL_ERROR,
    });
  }
};

exports.beforeUpdateBook = async (req, res) => {
  const idParam = req.query.id;

  if (!idParam) {
    return res.status(400).render("error.ejs", {
      code: 400,
      msg: "Book ID not provided.",
    });
  }

  try {
    const id = parseInt(idParam.trim());
    const Book = await regModels.getbeforeupdateBooks(id);

    if (Book.length === 0) {
      return res.status(404).render("error.ejs", {
        code: 404,
        msg: "Book not found.",
      });
    }

    const categories = await regModels.getAllCategories();

    res.render("updateBook.ejs", { book: Book[0], categories });
  } catch (err) {
    res.status(500).render("error.ejs", {
      code: 500,
      msg: err.message || "Internal Server Error",
    });
  }
};

exports.afterUpdateBook = async (req, res) => {
  try {
    const {
      id = "",
      title = "",
      author = "",
      publisher = "",
      isbn = "",
      category = "",
      total_copies = "",
      available_copies = "",
      status = "",
      oldImage = "",
    } = req.body;

    const image = req.file ? req.file.filename : oldImage;

    await regModels.getafterupdateBooks(
      id.trim(),
      title.trim(),
      author.trim(),
      publisher.trim(),
      isbn.trim(),
      category.trim(),
      total_copies.trim(),
      available_copies.trim(),
      status.trim(),
      image
    );

    res.redirect("/viewBooks");
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).render("error.ejs", {
      code: 500,
      msg: err.message || "Error updating book.",
    });
  }
};

exports.issueBooks = (req, res) => {
  res.render("issueBooks.ejs", { msg: "" });
};

exports.viewALLIssueBooks = (req, res) => {
  const sql =
    "SELECT issue_details.id,users.name as name,books.title AS title,issue_details.issue_date,issue_details.return_date,issue_details.status FROM issue_details JOIN users ON issue_details.issued_by = users.id JOIN books ON issue_details.book_id = books.id where issue_details.status = 'issued'";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error fetching students.",
        code: STATUS.INTERNAL_ERROR,
      });
    }
    res.render("viewIssueBook.ejs", { data: result });
  });
};

exports.viewReturnedBooks = (req, res) => {
  const sql =
    "SELECT issue_details.id,users.name as name,books.title AS title,issue_details.issue_date,issue_details.return_date,issue_details.status FROM issue_details JOIN users ON issue_details.issued_by = users.id JOIN books ON issue_details.book_id = books.id where issue_details.status = 'returned'";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error fetching students.",
        code: STATUS.INTERNAL_ERROR,
      });
    }
    res.render("viewReturnedBooks.ejs", { data: result });
  });
};

exports.issueBook = (req, res) => {
  let { user_id, book_id, issue_date, return_date, status } = req.body;
  let result = regModels.issueBook(
    user_id,
    book_id,
    issue_date,
    return_date,
    status
  );
  result
    .then((r) => {
      if (r.length > 0) {
        console.log(r);
        res.render("issueBooks.ejs", { msg: "Issue Book Successfully" });
      } else {
        res.render("issueBooks.ejs", { msg: "" });
      }
    })
    .catch((err) => {
      console.error("Error adding student:", err);
      res.status(500).render("error.ejs", { msg: "Error adding student" });
    });
};

exports.searchName = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await regModels.searchName(q);
    res.json(result);
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).send("Error adding student");
  }
};

exports.searchbook = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await regModels.searchbook(q);
    res.json(result);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

//User Page

exports.userLogin = (req, res) => {
  console.log("User Login page requested");
  res.render("userLogin.ejs", { msg: "" });
};

exports.studentLogin = async (req, res) => {
  let { username, password } = req.body;

  try {
    const profile = await regModels.getLoginProfile(username, password);
    if (profile.length > 0) {
      const token = jwt.sign(
        { id: profile[0].id, email: profile[0].email, role: profile[0].role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      res.cookie("token", token, { httpOnly: true });

      // Fetch counts for dashboard
      const bookCount = await regModels.countBooks();
      const categoryCount = await regModels.countCategories();

      res.render("userDashboard.ejs", {
        data: profile[0],
        token,
        bookCount,
        categoryCount,
      });
    } else {
      res.render("error.ejs", { msg: "user not found" });
    }
  } catch (err) {
    console.log("Error fetching user", err);
    res.render("error.ejs", { msg: "Internal server problem" });
  }
};

//search
exports.searchByCat = async (req, res) => {
  try {
    const userId = req.user.id;

    conn.query("SELECT * FROM users WHERE id = ?", [userId], (err, users) => {
      if (err || users.length === 0) {
        console.error("User fetch error:", err || "No user found");
        return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
          msg: "Error fetching user.",
          code: STATUS.INTERNAL_ERROR,
        });
      }

      regModels
        .viewUserBook()
        .then((books) => {
          res.render("userViewBooks.ejs", { books, data: users[0] });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).render("error.ejs", {
            code: 500,
            msg: "Failed to load books.",
          });
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error.ejs", {
      code: 500,
      msg: "Failed to load books.",
    });
  }
};

exports.searchByAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    conn.query("SELECT * FROM users WHERE id = ?", [userId], (err, users) => {
      if (err || users.length === 0) {
        console.error("User fetch error:", err || "No user found");
        return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
          msg: "Error fetching user.",
          code: STATUS.INTERNAL_ERROR,
        });
      }

      regModels
        .searchAuthor()
        .then((books) => {
          res.render("userViewBooks.ejs", { books, data: users[0] });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).render("error.ejs", {
            code: 500,
            msg: "Failed to load books.",
          });
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error.ejs", {
      code: 500,
      msg: "Failed to load books.",
    });
  }
};

exports.userIssueBook = (req, res) => {
  const userId = req.user.id;

  conn.query("SELECT * FROM users WHERE id = ?", [userId], (err, users) => {
    if (err || users.length === 0) {
      console.error("User fetch error:", err || "No user found");
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error fetching user.",
        code: STATUS.INTERNAL_ERROR,
      });
    }

    const sql = `
            SELECT 
                issue_details.id,
                users.name AS name,
                books.title AS title,
                issue_details.issue_date,
                issue_details.return_date,
                issue_details.status
            FROM 
                issue_details
            JOIN users ON issue_details.issued_by = users.id
            JOIN books ON issue_details.book_id = books.id
            WHERE 
                issue_details.issued_by = ? 
                AND issue_details.status = 'issued'
        `;

    conn.query(sql, [userId], (err, issues) => {
      if (err) {
        console.error("SQL error:", err);
        return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
          msg: "Error fetching issued books.",
          code: STATUS.INTERNAL_ERROR,
        });
      }

      res.render("userIssueBook.ejs", { data: users[0], issues });
    });
  });
};

exports.userDashboard = async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch user info
    const [users] = await new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (err, result) => {
          if (err || result.length === 0)
            return reject(err || "User not found");
          resolve(result);
        }
      );
    });

    // Fetch counts
    const bookCount = await regModels.countBooks();
    const categoryCount = await regModels.countCategories();

    res.render("userDashboard.ejs", {
      data: users,
      bookCount,
      categoryCount,
    });
  } catch (err) {   
    res.status(500).render("error.ejs", {
      msg: "User not found or error loading dashboard",
      code: 500,
    });
  }
};

exports.userReturnBook = (req, res) => {
  const userId = req.user.id;

  conn.query("SELECT * FROM users WHERE id = ?", [userId], (err, users) => {
    if (err || users.length === 0) {
      console.error("User fetch error:", err || "No user found");
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error fetching user.",
        code: STATUS.INTERNAL_ERROR,
      });
    }

    const sql = `
            SELECT 
                issue_details.id,
                users.name AS name,
                books.title AS title,
                issue_details.issue_date,
                issue_details.return_date,
                issue_details.status
            FROM 
                issue_details
            JOIN users ON issue_details.issued_by = users.id
            JOIN books ON issue_details.book_id = books.id
            WHERE 
                issue_details.issued_by = ? 
                AND issue_details.status = 'returned'
        `;

    conn.query(sql, [userId], (err, issues) => {
      if (err) {
        console.error("SQL error:", err);
        return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
          msg: "Error fetching issued books.",
          code: STATUS.INTERNAL_ERROR,
        });
      }

      res.render("userIssueBook.ejs", { data: users[0], issues });
    });
  });
};

exports.userReturnDashboard = (req, res) => {
  const userId = req.user.id;

  conn.query("SELECT * FROM users WHERE id = ?", [userId], (err, users) => {
    if (err || users.length === 0) {
      return res.status(500).render("error.ejs", {
        msg: "User not found",
        code: 500,
      });
    }

    res.render("userDashboard.ejs", { data: users[0] });
  });
};

// user profile

exports.userProfile = (req, res) => {
  const userId = req.user.id;

  conn.query("SELECT * FROM users WHERE id = ?", [userId], (err, users) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).render("error.ejs", {
        msg: "Database error",
        code: 500,
      });
    }

    if (users.length === 0) {
      return res.status(404).render("error.ejs", {
        msg: "User not found",
        code: 404,
      });
    }

    res.render("userProfile.ejs", { user: users[0] });
  });
};

//update issued books

exports.beforeUpdateIssueBook = async (req, res) => {
  const idParam = req.query.id;

  if (!idParam) {
    return res.status(400).render("error.ejs", {
      code: 400,
      msg: "Book ID not provided.",
    });
  }

  try {
    const id = parseInt(idParam.trim());
    const Book = await regModels.getbeforeupdateissueBooks(id);

    if (Book.length === 0) {
      return res.status(404).render("error.ejs", {
        code: 404,
        msg: "Book not found.",
      });
    }

    const categories = await regModels.getAllCategories();

    res.render("updateIssueBooks.ejs", { book: Book[0], categories });
  } catch (err) {
    res.status(500).render("error.ejs", {
      code: 500,
      msg: err.message || "Internal Server Error",
    });
  }
};
exports.afterUpdateIssueBook = (req, res) => {
  const { status, id } = req.body;

  regModels
    .getafterupdateissueBooks(status, id)
    .then(() => {
      res.redirect("/viewIssuedBooks");
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.status(500).send("Error updating status");
    });
};

exports.allBook = async (req, res) => {
  try {
    const books = await regModels.viewBooks();
    res.render("allBooks.ejs", { books });
  } catch (err) {
    console.error(err);
    res.status(500).render("error.ejs", {
      code: 500,
      msg: "Failed to load books.",
    });
  }
};

exports.userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
        msg: "Error logging out",
        code: STATUS.INTERNAL_ERROR,
      });
    }
    res.clearCookie("token");
    res.redirect("/userLogin");
  });
};
