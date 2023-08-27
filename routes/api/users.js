// Imports

const express = require("express");
const Utilities = require("ltm-utilities");
const fs = require("fs-extra");

// Router

const router = express.Router();

// Routes

router.get("/all", (req, res) => {
    let users = fs.readJsonSync("../../data/users.json");
    res.status(200).json(users);
});
router.get("/get?id=:id", (req, res) => {
    let users = fs.readJsonSync("../../data/users.json");
    if (!!users[req.params.id]) {
        res.status(200).json(users[req.params.id]);
    } else {
        res.status(404).json({
            message: "Not found!",
            code: 404,
            description: "This id does not belong too any user.",
        });
    }
});
router.post("/new", (req, res) => {
    let all = fs.readJsonSync("../../data/all.json");
    let users = fs.readJsonSync("../../data/users.json");
    let id = randomString({
        length: 20,
        numeric: false,
        specials: false,
        letters: false,
    });
    while (!!all[id] === false) {
        id = randomString({
            length: 20,
            numeric: false,
            specials: false,
            letters: false,
        });
    }
    let user = req.body;
    user.id = id;
    user.created = new Date().toLocaleDateString("en-GB");
    all[id] = user;
    fs.writeJsonSync("../../data/all.json", all, { spaces: 4 });
    fs.writeJsonSync("../../data/users.json", users, { spaces: 4 });
    res.status(200).json(user);
});
router.delete("/delete?id=:id", (req, res) => {
    let all = fs.readJsonSync("../../data/all.json");
    let users = fs.readJsonSync("../../data/users.json");
    if (!!users[req.params.id]) {
        delete users[req.params.id];
        fs.writeJsonSync("../../data/users.json", users, {
            spaces: 4,
        });
        delete all[req.params.id];
        fs.writeJsonSync("../../data/users.json", users, { spaces: 4 });
        fs.writeJsonSync("../../data/all.json", all, { spaces: 4 });
        res.status(200).json({
            message: "Success",
            code: 200,
            description: "Successfully deleted this user.",
        });
    } else {
        res.status(404);
    }
});
router.patch("/update?id=:id", (req, res) => {
    let all = fs.readJsonSync("../../data/all.json");
    let users = fs.readJsonSync("../../data/users.json");
    if (!!users[req.params.id]) {
        let user = req.body;
        user.id = req.params.id;
        users[req.params.id] = user;
        fs.writeJsonSync("../../data/users.json", user, { spaces: 4 });
        all[req.params.id] = user;
        fs.writeJsonSync("../../data/all.json", all, { spaces: 4 });
    } else {
        res.status(404);
    }
});

// Exports

module.exports = router;
