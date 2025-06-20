let express = require("express");
let regCtrl = require("../controller/regCtrl.js");
let upload = require("../middleware/upload.js"); 

// then use it here:



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
router.post("/addBook", upload.single("image"), regCtrl.addBook);
router.get("/viewBooks",regCtrl.viewBooks);
router.get("/deleteBook",regCtrl.deleteBooks);

router.get("/beforeUpdateBook", regCtrl.beforeUpdateBook);
router.post("/afterUpdateBook", upload.single("image"), regCtrl.afterUpdateBook);

// User Login
router.get("/UserLogin",regCtrl.userLogin)
router.post("/studLogin", regCtrl.studentLogin);

//Search

router.get("/searchByCategory",regCtrl.searchByCat);
router.get("/searchByAuthor",regCtrl.searchByAuth);


//issue Books routes
router.get("/books",regCtrl.issueBooks);
router.post("/issueBook",regCtrl.issueBook);

router.get("/admin/api/users/search",regCtrl.searchName);
router.get("/admin/api/category/search",regCtrl.searchbook);

router.get("/viewIssuedBooks",regCtrl.viewALLIssueBooks);

//Manage
router.get("/userDashboard", regCtrl.userDashboard);
router.get("/userIssueBooks", regCtrl.userIssueBook);
router.get("/userReturnDashboard", regCtrl.userReturnDashboard);
router.get("/userReturnBooks", regCtrl.userReturnBook);


module.exports = router;