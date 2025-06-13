let express = require("express");
let regCtrl = require("../controller/regCtrl.js");

let router = express.Router();

router.get("/", regCtrl.homePage);
router.get("/login", regCtrl.loginPage);
router.post("/adminLogin", regCtrl.adminLogin);
router.get("/about", regCtrl.aboutUs); 

//Student routes
router.get("/student", regCtrl.getAddStudent);
router.post("/saveStudent", regCtrl.postAddStudent);
router.get("/viewStudent",regCtrl.viewAllStudents);
router.get("/search",regCtrl.searchStud);
router.get("/deleteStudent",regCtrl.deleteStudents);
router.get("/error",regCtrl.errorPage);

//Category Routes
router.get("/addCategories", regCtrl.getAddCategories);
router.post("/saveCategories",regCtrl.postAddCategories);
router.get("/viewCategories",regCtrl.viewAllCategories);
router.get("/deleteCategory",regCtrl.deleteCategory);
router.get("/searchCat",regCtrl.searchCategory);

module.exports = router;
