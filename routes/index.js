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
    const db = req.app.get('db'); // Get the NeDB instance from the app settings
    db.find({ user: req.user.id }, (err, goals) => {
      if (err) {
        console.error(err);
        res.render("error/500");
      } else {
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
