const pollModel = require('../models/poll-model');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime)

const indexController = async (req, res) => {
    if (req.isAuthenticated()) {

        const polls = await pollModel.find({}).lean().populate('pollOperator');

        polls.forEach(poll => {
            poll.createdAt = dayjs(poll.createdAt).fromNow();
        });

        res.render('home', { polls, user: req.session.passport.user })
    } else {
        res.render('index');
    }
}

module.exports = { indexController }