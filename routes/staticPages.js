const express = require('express');
const router = express.Router();

router.get('/fitnessInfo', (req, res) => res.render('fitnessInfo'));
router.get('/nutritionalInfo', (req, res) => res.render('nutritionalInfo'));
router.get('/healthInfo', (req, res) => res.render('healthInfo'));

module.exports = router;
