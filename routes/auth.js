const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google authn callback
// @route   GET /auth/google/callback
router.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", { failureRedirect: "/" }, (err, user, info) => {
            if (err) {
                console.error("Authentication error:", err);
                return res.redirect("/");
            }
            
            if (!user) {
                console.error("No user returned from authentication");
                return res.redirect("/");
            }
            
            req.logIn(user, (err) => {
                if (err) {
                    console.error("Login error:", err);
                    return res.redirect("/");
                }
                
                console.log("Google auth callback - User authenticated:", user._id);
                return res.redirect("/dashboard");
            });
        })(req, res, next);
    }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

module.exports = router;
