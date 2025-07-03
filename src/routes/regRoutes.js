let express = require("express");
let regCtrl = require("../controller/regCtrl.js");
let upload = require("../middleware/upload.js");
const authenticateToken = require("../middleware/auth.js");
const { requireAdmin } = require("../middleware/auth.js");
let router = express.Router();

// Public routes
router.get("/", regCtrl.homePage);
router.get("/login", regCtrl.loginPage);
router.get("/UserLogin", regCtrl.userLogin);
router.post("/studLogin", regCtrl.studentLogin);
router.get("/allBook", regCtrl.allBook);
router.get("/about", regCtrl.aboutUs);

// Admin login (public)
router.post("/adminLogin", regCtrl.adminLogin);

// Admin-protected routes (JWT + admin role)
router.get("/adminDashboard", authenticateToken, requireAdmin, regCtrl.adminDashboard);
router.get("/adminProfile", authenticateToken, requireAdmin, regCtrl.adminProfile);
router.get("/logout", regCtrl.logout);

// Book routes (admin)
router.get("/addBookForm", authenticateToken, requireAdmin, regCtrl.addBookForm);
router.post("/addBook", authenticateToken, requireAdmin, upload.single("image"), regCtrl.addBook);
router.get("/viewBooks", authenticateToken, requireAdmin, regCtrl.viewBooks);
router.get("/deleteBook", authenticateToken, requireAdmin, regCtrl.deleteBooks);
router.get("/beforeUpdateBook", authenticateToken, requireAdmin, regCtrl.beforeUpdateBook);
router.post("/afterUpdateBook", authenticateToken, requireAdmin, upload.single("image"), regCtrl.afterUpdateBook);

// Student routes (admin)
router.get("/student", authenticateToken, requireAdmin, regCtrl.getAddStudent);
router.post("/saveStudent", authenticateToken, requireAdmin, regCtrl.postAddStudent);
router.get("/viewStudent", authenticateToken, requireAdmin, regCtrl.viewAllStudents);
router.get("/search", authenticateToken, requireAdmin, regCtrl.searchStud);
router.get("/deleteStudent", authenticateToken, requireAdmin, regCtrl.deleteStudents);
router.get("/update", authenticateToken, requireAdmin, regCtrl.loadUpdateForm);
router.post("/update", authenticateToken, requireAdmin, regCtrl.updateStudent);
router.get("/viewAllStudents", authenticateToken, requireAdmin, regCtrl.viewAllStudents);

// Category routes (admin)
router.get("/addCategories", authenticateToken, requireAdmin, regCtrl.getAddCategories);
router.post("/saveCategories", authenticateToken, requireAdmin, regCtrl.postAddCategories);
router.get("/viewCategories", authenticateToken, requireAdmin, regCtrl.viewAllCategories);
router.get("/deleteCategory", authenticateToken, requireAdmin, regCtrl.deleteCategory);
router.get("/searchCat", authenticateToken, requireAdmin, regCtrl.searchCategory);
router.get("/beforeUpdateCat", authenticateToken, requireAdmin, regCtrl.beforeUpdateCat);
router.post("/afterUpdateCat", authenticateToken, requireAdmin, regCtrl.afterUpdateCat);

// Issue Books routes (admin)
router.get("/books", authenticateToken, requireAdmin, regCtrl.issueBooks);
router.post("/issueBook", authenticateToken, requireAdmin, regCtrl.issueBook);
router.get("/viewIssuedBooks", authenticateToken, requireAdmin, regCtrl.viewALLIssueBooks);
router.get("/viewReturnedBooks", authenticateToken, requireAdmin, regCtrl.viewReturnedBooks);

// Search APIs (admin)
router.get("/admin/api/users/search", authenticateToken, requireAdmin, regCtrl.searchName);
router.get("/admin/api/category/search", authenticateToken, requireAdmin, regCtrl.searchbook);

// Count APIs (admin)
router.get("/countStudents", authenticateToken, requireAdmin, regCtrl.countStudents);
router.get("/countCategories", authenticateToken, requireAdmin, regCtrl.countCategories);
router.get("/countBooks", authenticateToken, requireAdmin, regCtrl.countBooks);

// Update issued books (admin)
router.get("/beforeUpdateIssueBook", authenticateToken, requireAdmin, regCtrl.beforeUpdateIssueBook);
router.post("/afterUpdateIssueBook", authenticateToken, requireAdmin, regCtrl.afterUpdateIssueBook);

// Error page (public)
router.get("/error", regCtrl.errorPage);

// User-protected routes (JWT required)
router.get("/userDashboard", authenticateToken, regCtrl.userDashboard);
router.get("/userIssueBooks", authenticateToken, regCtrl.userIssueBook);
router.get("/userReturnDashboard", authenticateToken, regCtrl.userReturnDashboard);
router.get("/userReturnBooks", authenticateToken, regCtrl.userReturnBook);
router.get("/profile", authenticateToken, regCtrl.userProfile);
router.get("/searchByCategory", authenticateToken, regCtrl.searchByCat);
router.get("/searchByAuthor", authenticateToken, regCtrl.searchByAuth);
router.get("/userLogout", regCtrl.userLogout);


module.exports = router;