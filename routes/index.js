const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Goal = require("../models/Goal");

const router = express.Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
    const error = req.query.error;
    const errorMessage = req.query.message;
    let displayErrorMessage = null;
    
    if (error === 'auth_error') {
        displayErrorMessage = errorMessage || 'Authentication error occurred. Please try again.';
    } else if (error === 'no_user') {
        displayErrorMessage = 'No user found. Please try again.';
    } else if (error === 'login_error') {
        displayErrorMessage = errorMessage || 'Login error occurred. Please try again.';
    }
    
    console.log("Rendering login page. Error:", error, "Message:", errorMessage);
    
    res.render("login", {
        layout: "login",
        error: displayErrorMessage
    });
});

// @desc    Debug route for Heroku
// @route   GET /debug
router.get("/debug", (req, res) => {
    res.json({
        env: process.env.NODE_ENV,
        authenticated: req.isAuthenticated(),
        user: req.user,
        session: req.session ? {
            id: req.session.id,
            cookie: req.session.cookie
        } : null,
        cookies: req.cookies,
        headers: req.headers
    });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        console.log("Dashboard accessed by user:", req.user._id);
        console.log("User details:", JSON.stringify(req.user));
        
        if (!req.db) {
            console.error("Database not available in request");
            return res.render("error/500", {
                error: "Database connection error"
            });
        }
        
        req.db.find({ user: req.user._id }, (err, goals) => {
            if (err) {
                console.error("Error fetching goals:", err);
                return res.render("error/500", {
                    error: "Failed to fetch goals: " + err.message
                });
            }
            
            console.log("Goals found:", goals ? goals.length : 0);
            
            // Add some sample stats for the dashboard
            const stats = {
                activeGoals: goals ? goals.filter(goal => !goal.completed).length : 0,
                completedGoals: goals ? goals.filter(goal => goal.completed).length : 0,
                fitnessScore: 75,
                nutritionScore: 82
            };
            
            // Add a streak counter
            const streak = Math.floor(Math.random() * 10) + 1; // Random streak between 1-10 for demo
            
            res.render("dashboard", {
                name: req.user.firstName,
                user: req.user, // Pass the entire user object to the template
                goals,
                stats,
                streak,
                date: new Date()
            });
        });
    } catch (err) {
        console.error("Exception in dashboard route:", err);
        res.render("error/500", {
            error: err.message
        });
    }
});

module.exports = router;
