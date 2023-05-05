const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Goal = require("../models/Goal");

const router = express.Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
    res.render("login", {
        layout: "login",
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        console.log("User ID:", req.user._id); // Debug: Print the user ID
        req.db.find({ user: req.user._id }, (err, goals) => {
            if (err) {
                console.error(err);
                res.render("error/500");
            } else {
                console.log("Goals:", goals); // Debug: Print the goals
                res.render("dashboard", {
                    name: req.user.firstName,
                    goals,
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

module.exports = router;
