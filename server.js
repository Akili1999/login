const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/logintest");

const passport = require("passport");
const session = require("express-session");

app.use(
    session({
        secret: "terrible-string",
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false}
    })
);

app.use(passport.initialize());
app.use(passport.session());

const routes = require("./routes")
app.use(routes);

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
