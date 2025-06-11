let express = require("express");
let app = express();

let PORT = 3000;
app.listen(PORT ,()=>{
    console.log("Server Created at Port "+PORT);
});