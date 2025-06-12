let express = require("express");
let regCtrl = require("../controller/regCtrl.js");

let router = express.Router();

router.get("/", regCtrl.homePage);
router.get("/login", regCtrl.loginPage);
router.post("/adminLogin", regCtrl.adminLogin);
router.get("/about", regCtrl.aboutUs); 
router.get("/student", regCtrl.getAddStudent);
router.post("/saveStudent", regCtrl.postAddStudent);

module.exports = router;
