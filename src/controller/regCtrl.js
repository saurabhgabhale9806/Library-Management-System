let regService = require("../services/regServices.js");
let regModels = require("../model/regModel.js");
const conn = require("../config/db.js");
const { profile } = require("console");

// HTTP Status Codes
const STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_ERROR: 500
};

exports.homePage = (req, res) => {
    res.render("home.ejs");
};

exports.loginPage = (req, res) => {
    console.log("Login page requested");
    res.render("login.ejs", { msg: "" });

};

exports.adminLogin = (req, res) => {
    const adminData = {
        username: "Admin",
        password: "Admin@123"
    };
    const { username, password } = req.body;

    if (username === adminData.username && password === adminData.password) {
        res.render("adminDashboard");
    } else {
        res.status(STATUS.UNAUTHORIZED).render("error.ejs", {
            msg: "Invalid credentials",
            code: STATUS.UNAUTHORIZED
        });
    }
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
                code: STATUS.BAD_REQUEST
            });
        }

        const result = await regModels.addStudent(name.trim(), email.trim(), password.trim());
        console.log(result);
        res.render("addStudent.ejs", { msg: "Student added successfully." });

    } catch (err) {
        console.error(err);
        res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
            msg: "Error saving student.",
            code: STATUS.INTERNAL_ERROR
        });
    }
};

exports.viewAllStudents = (req, res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
                msg: "Error fetching students.",
                code: STATUS.INTERNAL_ERROR
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
            code: STATUS.INTERNAL_ERROR
        });
    }
};

exports.errorPage = (req, res) => {
    res.render("error.ejs", { msg: "Something went wrong", code: STATUS.INTERNAL_ERROR });
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

  regModels.updateStudent(name, email, password, id)
    .then(() => {
      res.redirect("/viewAllStudents");
    })
    .catch((err) => {
      let message = "Internal server error during update.";
      if (err.code === 'ER_DUP_ENTRY') {
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
    res.render("addCategories.ejs",{msg:""});
};

exports.postAddCategories = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name  || name.trim() === "" ) {
      return res.status(400).send("Category name is required.");
    }

    const result = await regModels.addCategories(name.trim());
    console.log(result);
    res.render("addCategories",{msg:"Category added successfully."});
  } catch (err) {
    console.error(err);
    res.status(500).render({msg:"Error saving category."});
  } 
};

exports.viewAllCategories = (req, res) => {
    conn.query("SELECT * FROM categories", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
                msg: "Error fetching categories.",
                code: STATUS.INTERNAL_ERROR
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
            code: STATUS.INTERNAL_ERROR
        });
    }
};

exports.searchCategory= async (req, res) => {
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
      msg: err.sqlMessage || err.message || "An error occurred while updating the category.",
    });
  }
};


// Show add book form with categories
exports.addBookForm = async (req, res) => {
  let categories = await regModels.getViewcategorie();
  res.render("addBooks.ejs", { categories });
};

// Handle book saving
exports.addBook = (req, res) => {
  const { title, author, publisher, isbn, category, total_copies, available_copies, status } = req.body;
  const image = '/uploads/' + req.file.filename;

  regModels.addBook(title, author, publisher, isbn, category, total_copies, available_copies, status, image)
    .then(() => {
      res.render("adminDashboard.ejs");
    })
    .catch((err) => {
      console.error("Add Book Error:", err);
      res.render("error.ejs");
    });
};

exports.viewBooks = async (req, res) => {
  try {
    const books = await regModels.viewBooks();
    res.render("viewBooks.ejs", { books });
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
            code: STATUS.INTERNAL_ERROR
        });
    }
};

exports.issueBooks = (req,res) => {
    res.render("issueBooks.ejs",{msg:""});
}

exports.viewALLIssueBooks = (req, res) => {
    conn.query("SELECT * FROM issue_details", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
                msg: "Error fetching students.",
                code: STATUS.INTERNAL_ERROR
            });
        }
        res.render("viewIssueBook.ejs", { data: result });
    });
};



//User Page

exports.userLogin = (req, res) => {
    console.log("Login page requested");
    res.render("userLogin.ejs", { msg: "" });
};


// exports.studentLogin = (req, res) => {
//     let loginId=req.session.uid;

//     regModels.getLoginProfile(loginID)

//    .then((profile)=>{
//     if(profile.length>0){
//       res.render("userDashboard.ejs",{user:profile[0]});
//     }
//     else{
//       res.render("error.ejs",{msg:"user not found"});
//     }
//    })
//    .catch((err)=>{
//       console.log("Error fetching user",err);
//       res.render("error.ejs",{msg:"Internal server problem"});
//    })
// };
exports.studentLogin = (req, res) => {
    let {username,password}=req.body;

    regModels.getLoginProfile(username,password).then((profile)=>{
    if(profile.length>0){
      req.session.uid=profile[0].id;
      res.render("userDashboard.ejs",{user:profile[0]});
    }
    else{
      res.render("error.ejs",{msg:"user not found"});
    }
   })
   .catch((err)=>{
      console.log("Error fetching user",err);
      res.render("error.ejs",{msg:"Internal server problem"});
   })
};


//search
exports.searchByCat = async (req, res) => {
  try {
    const books = await regModels.viewUserBook();
    res.render("userViewBooks.ejs", { books }); // filename should match
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
    const books = await regModels.searchAuthor();
    res.render("userViewBooks.ejs", { books }); // filename should match
  } catch (err) {
    console.error(err);
    res.status(500).render("error.ejs", {
      code: 500,
      msg: "Failed to load books.",
    });
  }
};


exports.userIssueBook = (req, res) => {
    conn.query("SELECT * FROM issue_details", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(STATUS.INTERNAL_ERROR).render("error.ejs", {
                msg: "Error fetching students.",
                code: STATUS.INTERNAL_ERROR
            });
        }
        res.render("userIssueBook.ejs", { data: result });
    });
};

