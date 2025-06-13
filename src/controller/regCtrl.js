let regService = require("../services/regServices.js");
let regModels = require("../model/regModel.js");
const conn = require("../config/db.js");

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