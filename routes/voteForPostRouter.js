const router = require('express').Router();
const pollModel = require('../models/poll-model');

router.get('/', async (req, res) => {

    try {
        const {user, id, option } = req.query;

        const poll = await pollModel.findOne({ _id: id });

        poll.votes.push({ option, user });

        poll.votedUsers.push(user);

        poll.save();

        res.redirect(`/poll?id=${id}`)
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;