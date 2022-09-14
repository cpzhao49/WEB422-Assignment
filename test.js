var express = require('express');
var app = express();

const PORT = 8080;

app.listen(PORT, () => {
    console.log("app running on port " + PORT);
})
app.get("/user", (req, res) => {
    var para = req.query;
    var test = req.query.title;

    if (test == null) {
        console.log("null");
    } else {
        console.log(test);
    }
})

