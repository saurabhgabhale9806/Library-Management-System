let regService = require("../services/regServices.js");
let regModels = require("../model/regModel.js");

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
        res.status(401).render("login.ejs", { msg: "Invalid credentials" });
    }
};

exports.aboutUs = (req, res) => {
    res.render("about.ejs");
};

exports.getAddStudent = (req, res) => {
    res.render("addStudent.ejs");
};

exports.postAddStudent = async (req, res) => {
    try {
        let { name, email, password, confirm } = req.body;

        if (password.trim() !== confirm.trim()) {
            return res.status(400).send("Passwords do not match.");
        }

        const result = await regModels.addStudent(name.trim(), email.trim(), password.trim());
        console.log(result);
        res.send("Student added successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving student.");
    }
};
