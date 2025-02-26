const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", (req, res, next) => {
    console.log("Starting Google authentication process");
    passport.authenticate("google", { 
        scope: ["profile"],
        prompt: "select_account" // Force Google to show the account selection screen
    })(req, res, next);
});

// @desc    Google authn callback
// @route   GET /auth/google/callback
router.get(
    "/google/callback",
    (req, res, next) => {
        console.log("Google callback received, authenticating...");
        
        passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
            if (err) {
                console.error("Authentication error:", err);
                return res.redirect("/?error=auth_error");
            }
            
            if (!user) {
                console.error("No user returned from authentication");
                return res.redirect("/?error=no_user");
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    console.error("Login error:", err);
                    return res.redirect("/?error=login_error");
                }
                
                console.log("Google auth callback - User authenticated:", user._id);
                
                // Set a cookie to help with debugging
                res.cookie('auth_success', 'true', { 
                    maxAge: 60000, // 1 minute
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });
                
                return res.redirect("/dashboard");
            });
        })(req, res, next);
    }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res, next) => {
    console.log("Logging out user:", req.user ? req.user._id : 'Not logged in');
    req.logout(function(err) {
        if (err) { 
            console.error("Logout error:", err);
            return next(err); 
        }
        res.redirect("/");
    });
});

module.exports = router;
