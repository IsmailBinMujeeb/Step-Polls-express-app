const router = require('express').Router();
const userModel = require('../models/user-model');
const pollModel = require('../models/poll-model');

router.post('/', async (req, res)=>{

    try {
        
        const { pollQuestion, options, pollDuration } = req.body;

        const user = await userModel.findOne({_id: req.session.passport.user})

        console.log(user, req.session.passport.user)

        const newPoll = await pollModel.create({ pollQuestion, pollOptions: options, pollDuration: Date.now() + Number(pollDuration), pollOperator: user._id });

        user.polls.push(newPoll);
        user.save();

        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;