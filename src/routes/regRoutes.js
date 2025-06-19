let express = require("express");
let regCtrl = require("../controller/regCtrl.js");
let multer = require("../middleware/upload.js");

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
router.get("/update",regCtrl.loadUpdateForm);
router.post("/update",regCtrl.updateStudent);
router.get("/viewAllStudents", regCtrl.viewAllStudents);

//Category Routes
router.get("/addCategories", regCtrl.getAddCategories);
router.post("/saveCategories",regCtrl.postAddCategories);
router.get("/viewCategories",regCtrl.viewAllCategories);
router.get("/deleteCategory",regCtrl.deleteCategory);
router.get("/searchCat",regCtrl.searchCategory);
router.get("/beforeUpdateCat", regCtrl.beforeUpdateCat);
router.post("/afterUpdateCat", regCtrl.afterUpdateCat);

//Book routes
router.get("/addBookForm",regCtrl.addBookForm);
router.post("/addBook", multer.single("image"), regCtrl.addBook);
router.get("/viewBooks",regCtrl.viewBooks);
router.get("/deleteBook",regCtrl.deleteBooks);


//issue Books routes
router.get("/books",regCtrl.issueBooks);
router.get("/viewIssuedBooks",regCtrl.viewALLIssueBooks);


// User Login

router.get("/UserLogin",regCtrl.userLogin)
router.post("/studLogin", regCtrl.studentLogin);

//Search

router.get("/searchByCategory",regCtrl.searchByCat);
router.get("/searchByAuthor",regCtrl.searchByAuth);

//Manage
router.get("/userIssueBooks",regCtrl.userIssueBook);
module.exports = router;
