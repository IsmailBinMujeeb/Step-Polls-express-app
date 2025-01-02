const router = require('express').Router();
const pollModel = require('../models/poll-model');
const { isAuthenticated } = require('../utils/isAuth')

router.get('/', isAuthenticated, async (req, res) => {

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