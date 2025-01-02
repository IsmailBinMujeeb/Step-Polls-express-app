const router = require('express').Router();
const pollModel = require('../models/poll-model');

router.get('/', async (req, res) => {

    try {
        const { id } = req.query;

        const poll = await pollModel.findOne({ _id: id });
        let totalVotes = 0;

        const votesCounter = poll.votes.reduce((counts, option) => {
            counts[option.option] = (counts[option.option] || 0) + 1;
            totalVotes++;
            return counts;
          }, {});

        console.log(typeof ((votesCounter['Me']/totalVotes)*100), typeof votesCounter['Me'])

        res.render('pollDetails', {poll, votes: votesCounter, totalVotes})
    } catch (error) {
        console.log(poll)
    }
})

module.exports = router;