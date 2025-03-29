const passport = require('passport');

const router = require('express').Router();

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'login' }), (req, res)=>{

    res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

module.exports = router;