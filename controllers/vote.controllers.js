const mongoose = require('mongoose')
const pollModel = require('../models/poll-model');

const voteController = async (req, res) => {

    try {
        const { user, id, option } = req.query;

        const poll = await pollModel.findOne({ _id: id });

        const isVoted = poll.votedUsers.some(id => id.equals(new mongoose.Types.ObjectId(user)))

        if (!isVoted) {
            poll.votes.push({ option, user });

            poll.votedUsers.push(user);

            poll.save();
        }

        return res.redirect(`/poll?id=${id}`)

    } catch (error) {
        console.log(error)
    }
}

module.exports = { voteController }