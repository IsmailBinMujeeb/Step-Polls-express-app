const router = require('express').Router();

router.get('/', (req, res)=>{

    const err = req.flash('error');

    res.render('login', { err })
})

module.exports = router