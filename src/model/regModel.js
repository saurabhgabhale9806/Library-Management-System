let conn = require("../config/db.js");

exports.addStudent = (name, email, password) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'member')";
        conn.query(sql, [name, email, password], (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
};
