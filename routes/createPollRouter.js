const router = require('express').Router();
const { isAuthenticated } = require('../utils/isAuth');

router.get('', isAuthenticated, (req, res)=>{

    res.render('createPoll');
})

module.exports = router;