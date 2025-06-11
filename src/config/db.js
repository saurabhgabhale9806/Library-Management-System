let mysql = require("mysql2");
let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "miniproject"
    });
conn.connect((err)=>{
    if(err){
        console.log("Database not Connected");
    }
    else{
        console.log("Database Connected");
    }
});
module.exports = conn;