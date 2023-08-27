// Imports

const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const path = require("path");

// App

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "PATCH"],
        origin: "*",
    })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Routes

// API

const PACKAGES = require("./routes/api/packages");
app.use("/api/packages", PACKAGES);
const USERS = require("./routes/api/users");
app.use("/api/users", USERS);

// Pages

const PAGES = require("./routes/pages");
app.use("/", PAGES);
