let express = require("express");
let app = express();

console.log("hello");
let PORT = 3000;
app.listen(PORT ,()=>{
    console.log("Server Created at Port "+PORT);
});