const router = require('express').Router();
const userModel = require('../models/user-model');
const pollModel = require('../models/poll-model');
const { isAuthenticated } = require('../utils/isAuth');

router.get('/create-poll', isAuthenticated, (req, res)=>{

    res.render('createPoll');
})

router.post('/create-poll', async (req, res)=>{

    try {
        
        const { pollQuestion, options, pollDuration } = req.body;

        const user = await userModel.findOne({_id: req.session.passport.user})

        const newPoll = await pollModel.create({ pollQuestion, pollOptions: options, pollDuration: Date.now() + Number(pollDuration), pollOperator: user._id } );

        user.polls.push(newPoll);
        user.save();

        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

router.post('/post-comment', async (req, res) => {

    try {
        const { user, id, comment } = req.query;

        const userData = await userModel.findOne({ _id: user });

        if (!userData) {
            res.status(404).send({ message: 'User not found' })
        }

        const poll = await pollModel.findOneAndUpdate({ _id: id }, {
            $push: { comments: { user: userData.name, userId: user, comment } }
        }, { new: true });

        res.send({ user: userData.name, comment });
    } catch (error) {
        console.log(error)
    }

})

router.get('/poll', isAuthenticated, async (req, res) => {

    try {
        const { id } = req.query;

        const poll = await pollModel.findOne({ _id: id });
        let totalVotes = 0;

        const votesCounter = poll.votes.reduce((counts, option) => {
            counts[option.option] = (counts[option.option] || 0) + 1;
            totalVotes++;
            return counts;
        }, {});

        res.render('pollDetails', { poll, userid: req.session.passport.user, votes: votesCounter, totalVotes })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;