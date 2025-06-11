let routes = require("express");
let regCtrl = require("../controller/regCtrl.js");

let router = routes.Router() ;
router.get("/",regCtrl.homePage);
router.get("/login",regCtrl.loginPage);
router.post("/adminLogin",regCtrl.adminLogin);

module.exports = router;