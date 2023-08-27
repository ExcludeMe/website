// Imports

const express = require("express");
const randomString = require("random-string");
const fs = require("fs-extra");

// Router

const router = express.Router();

// Routes

router.get("/all", (req, res) => {
    let packages = fs.readJsonSync("../../data/packages.json");
    res.status(200).json(packages);
});
router.get("/get?id=:id", (req, res) => {
    let packages = fs.readJsonSync("../../data/packages.json");
    if (!!packages[req.params.id]) {
        res.status(200).json(packages[req.params.id]);
    } else {
        res.status(404).json({
            message: "Not found!",
            code: 404,
            description: "This id does not belong too any package.",
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
    let package = req.body;
    package.id = id;
    package.updated = new Date().toLocaleDateString("en-GB");
    all[id] = package;
    all[package.creator].packages[id] = package;
    fs.writeJsonSync("../../data/all.json", all, { spaces: 4 });
    let packages = fs.readJsonSync("../../data/packages.json");
    packages[id] = package;
    users[package.creator].packages[id] = package;
    fs.writeJsonSync("../../data/users.json", users, { spaces: 4 });
    fs.writeJsonSync("../../data/packages.json", packages, { spaces: 4 });
    res.status(200).json(package);
});
router.delete("/delete?id=:id/user=:user", (req, res) => {
    let all = fs.readJsonSync("../../data/all.json");
    let packages = fs.readJsonSync("../../data/packages.json");
    if (!!packages[req.params.id]) {
        if (packages[req.params.id].creator === req.params.user) {
            delete packages[req.params.id];
            fs.writeJsonSync("../../data/packages.json", packages, {
                spaces: 4,
            });
            delete all[req.params.id];
            fs.writeJsonSync("../../data/all.json", all, { spaces: 4 });
            res.status(200).json({
                message: "Success",
                code: 200,
                description: "Successfully deleted this package.",
            });
        } else {
            res.status(401).json({
                message: "Unauthorized",
                code: 401,
                description:
                    "The given user id does not match with the creators'",
            });
        }
    } else {
        res.status(404);
    }
});
router.patch("/update?id=:id", (req, res) => {
    let all = fs.readJsonSync("../../data/all.json");
    let packages = fs.readJsonSync("../../data/packages.json");
    if (!!packages[req.params.id]) {
        let package = req.body;
        package.id = req.params.id;
        package.updated = new Date().toLocaleDateString("en-GB");
        packages[req.params.id] = package;
        fs.writeJsonSync("../../data/packages.json", package, { spaces: 4 });
        all[req.params.id] = package;
        fs.writeJsonSync("../../data/all.json", all, { spaces: 4 });
    } else {
        res.status(404);
    }
});

// Exports

module.exports = router;
