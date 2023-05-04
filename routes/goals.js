const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Datastore = require("nedb");
const path = require("path");

// Set up NeDB
const dbPath = path.join(__dirname, "..", "goals.db");
const db = new Datastore({ filename: dbPath, autoload: true });

// @desc    Show add page
// @route   GET /goals/add
router.get("/add", ensureAuth, (req, res) => {
    res.render("goals/add");
});

// @desc    Process add form
// @route   POST /goals
router.post("/", ensureAuth, (req, res) => {
    try {
        const newGoal = { ...req.body, user: req.user.id };
        db.insert(newGoal, (err) => {
            if (err) {
                console.error(err);
                res.render("error/500");
            } else {
                res.redirect("/dashboard");
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

// @desc    Show all goals
// @route   GET /goals
router.get("/", ensureAuth, async (req, res) => {
    try {
        db.find({ status: "public" }, (err, goals) => {
            if (err) {
                console.error(err);
                res.render("error/500");
            } else {
                res.render("goals/index", {
                    goals,
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
        db.findOne({ _id: req.params.id }, (err, goal) => {
            if (err || !goal) {
                console.error(err);
                res.render("error/404");
            } else {
                if (goal.user != req.user.id && goal.status == "private") {
                    res.render("error/404");
                } else {
                    res.render("goals/show", {
                        goal,
                    });
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
});

// @desc    Show edit page
// @route   GET /goals/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
    try {
        db.findOne({ _id: req.params.id }, (err, goal) => {
            if (err || !goal) {
                console.error(err);
                res.render("error/404");
            } else {
                if (goal.user != req.user.id) {
                    res.redirect("/goals");
                } else {
                    res.render("goals/edit", {
                        goal,
                    });
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

// @desc    Update goal
// @route   PUT /goals/:id
router.put("/:id", ensureAuth, async (req, res) => {
    try {
        db.findOne({ _id: req.params.id }, (err, goal) => {
            if (err || !goal) {
                console.error(err);
                res.render("error/404");
            } else {
                if (goal.user != req.user.id) {
                    res.redirect("/goals");
                } else {
                    db.update(
                        { _id: req.params.id },
                        { $set: req.body },
                        {},
                        (err) => {
                            if (err) {
                                console.error(err);
                                res.render("error/500");
                            } else {
                                res.redirect("/dashboard");
                            }
                        }
                    );
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

// @desc    Delete goal
// @route   DELETE /goals/:id
router.delete("/:id", ensureAuth, async (req, res) => {
    try {
        db.findOne({ _id: req.params.id }, (err, goal) => {
            if (err || !goal) {
                console.error(err);
                res.render("error/404");
            } else {
                if (goal.user != req.user.id) {
                    res.redirect("/goals");
                } else {
                    db.remove({ _id: req.params.id }, {}, (err) => {
                        if (err) {
                            console.error(err);
                            res.render("error/500");
                        } else {
                            res.redirect("/dashboard");
                        }
                    });
                }
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

// @desc    User goals
// @route   GET /goals/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
    try {
        db.find({ user: req.params.userId, status: "public" }, (err, goals) => {
            if (err) {
                console.error(err);
                res.render("error/500");
            } else {
                res.render("goals/index", {
                    goals,
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.render("error/500");
    }
});

//@desc Search goals by title
//@route GET /goals/search/:query
router.get("/search/:query", ensureAuth, async (req, res) => {
    try {
        db.find(
            { title: new RegExp(req.query.query, "i"), status: "public" },
            (err, goals) => {
                if (err) {
                    console.log(err);
                    res.render("error/404");
                } else {
                    res.render("goals/index", { goals });
                }
            }
        );
    } catch (err) {
        console.log(err);
        res.render("error/404");
    }
});

module.exports = router;
