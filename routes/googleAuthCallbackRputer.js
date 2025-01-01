const passport = require('passport');

const router = require('express').Router();

router.get('/', passport.authenticate('google', { failureRedirect: 'login' }), (req, res)=>{

    res.redirect('/');
});

module.exports = router;