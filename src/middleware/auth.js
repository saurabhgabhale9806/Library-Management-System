const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).render("error.ejs", { msg: "Unauthorized", code: 401 });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).render("error.ejs", { msg: "Forbidden", code: 403 });
        }
        req.user = user;
        next();
    });
}

function requireAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).render("error.ejs", { msg: "Admins only", code: 403 });
}

module.exports = authenticateToken;
module.exports.requireAdmin = requireAdmin;