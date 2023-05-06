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

// @desc    Show single goal
// @route   GET /goals/:id
router.get("/:id", ensureAuth, async (req, res) => {
    try {
        let goal = await new Promise((resolve, reject) => {
            req.db.findOne({ _id: req.params.id }, (err, goal) => {
                if (err || !goal) {
                    reject(err);
                } else {
                    resolve(goal);
                }
            });
        });
        res.render("goals/show", {
            goal,
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
});

// @desc    Show edit page using promise
// @route   GET /goals/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
    try {
        let goal = await new Promise((resolve, reject) => {
            req.db.findOne({ _id: req.params.id }, (err, goal) => {
                if (err || !goal) {
                    reject(err);
                } else {
                    resolve(goal);
                }
            });
        });
        res.render("goals/edit", {
            goal,
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
});

// @desc    Update goal using promise
// @route   PUT /goals/:id
router.post("/:id", ensureAuth, async (req, res) => {
    try {
        console.log("putty");
        let goal = await new Promise((resolve, reject) => {
            req.db.update(
                { _id: req.params.id },
                { $set: { title: req.body.title, body: req.body.body } },
                {},
                (err, goal) => {
                    if (err || !goal) {
                        reject(err);
                    } else {
                        resolve(goal);
                    }
                }
            );
        }
        );
        res.redirect("/dashboard");
        

    } catch (err) {
        console.error(err);
        return res.render("error/500");
    }
});

module.exports = router;
