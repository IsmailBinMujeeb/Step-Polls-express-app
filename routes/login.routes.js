const passport = require('passport');

const router = require('express').Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/login', (req, res)=>{

    const err = req.flash('error');

    res.render('login', { err })
})

module.exports = router