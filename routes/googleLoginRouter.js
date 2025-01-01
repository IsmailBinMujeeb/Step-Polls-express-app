const passport = require('passport');

const router = require('express').Router();

router.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));

module.exports = router;