const apiRoutesUser = require("./api-routes-user/");

const path = require("path");

const express = require("express");

const router = express.Router();

router.use("/api/users", apiRoutesUser);

router.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

module.exports = router;
