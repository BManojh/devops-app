const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(__dirname));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});