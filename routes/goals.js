const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Goal = require("../models/Goal");
const User = require("../models/User");

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
            req.db.insert(req.body, (err, newDoc) => {
                // Changed this line from 'Goal.insert' to 'req.db.insert'
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

// @desc    Show all goals
// @route   GET /goals
router.get("/", ensureAuth, async (req, res) => {
    try {
        req.db
            .find({ status: "public" })
            .sort({ createdAt: -1 })
            .exec(async (err, goals) => {
                if (err) {
                    console.error(err);
                    res.render("error/500");
                } else {
                    const populatedGoals = await Promise.all(
                        goals.map(async (goal) => {
                            return new Promise((resolve, reject) => {
                                req.db.findOne(
                                    { _id: goal.user },
                                    (err, user) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            goal.user = user;
                                            resolve(goal);
                                        }
                                    }
                                );
                            });
                        })
                    );

                    res.render("goals/index", {
                        goals: populatedGoals,
                    });
                }
            });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

module.exports = router;
