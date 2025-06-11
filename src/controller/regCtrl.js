let regService = require("../services/regServices.js");
let regModels = require("../model/regModel.js");

exports.homePage = (req,res)=>{
    res.render("home.ejs");
}
exports.loginPage = (req,res)=>{
    console.log("Login page requested");
    res.render("login.ejs",{msg:""});
}
exports.adminLogin = (req,res)=> {
       const adminData = {
            username : "Admin",
            password : "Admin@123"
       }
    }

