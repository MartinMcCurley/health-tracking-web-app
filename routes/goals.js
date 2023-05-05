const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Goal = require("../models/Goal");

// @desc    Show add page
// @route   GET /goals/add
router.get("/add", ensureAuth, (req, res) => {
    res.render("goals/add");
});

// @desc    Process add form
// @route   POST /goals
router.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user._id;

        await new Promise((resolve, reject) => {
            req.db.insert(req.body, (err, newDoc) => { // Changed this line from 'Goal.insert' to 'req.db.insert'
                if (err) {
                    reject(err);
                } else {
                    resolve(newDoc);
                }
            });
        });

        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});



module.exports = router;