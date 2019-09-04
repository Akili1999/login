const express = require("express");

const router = express.Router();

const db = require("../../models");

const passport = require("../../config/passport")

router.post("/signup", (req, res) => {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(createdUserInfo => {
        console.log("user added")
    })
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    const userInfo = {
        username: req.user.username,
        id: req.user._id
    }
    console.log(req.session)
    console.log("user info: " + userInfo.id)
    res.send(userInfo)
});

router.post("/logout", (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
} else {
    res.send({ msg: "no user to log out" })
}
});

router.post("/find", (req, res, next) => {
    console.log("req.user: " + req.user._id)
    if (req.user !== undefined) {
        console.log("authenticated")
        res.status(200)
        res.json({ user: req.user })
    } else {
        res.status(401).send()
        console.log("not authenticated")
    }
});

// This is where saved user information would go as well
// the following is commented out, and is an example

// router.post("/forms", (req, res) => {
//     if (req.body.id) {
//       db.User.findById(req.body.id)
//         .then(user => {
//           let userForms = {
//             owned: user.owned_forms,
//             borrowed: user.borrowed_forms
//           }
//           res.json(userForms)
//         })
//         .catch(err => {
//           console.log("ERROR: " + err)
//         })
//     }
//   })

module.exports = router;
