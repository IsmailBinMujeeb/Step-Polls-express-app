const router = require('express').Router();
const userModel = require('../models/user-model');
const { isAuthenticated } = require('../utils/isAuth');

router.get('/', isAuthenticated, async (req, res)=>{

    try {

        const user = await userModel.findOne({ _id: req.query.user }).lean().populate('polls');

        let endedPolls = [];
        let unEndedPolls = [];

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.polls.forEach(poll => {
            if (poll.pollDuration.getTime() < Date.now()) endedPolls.push(poll)
            else unEndedPolls.push(poll)
        });

        res.render('profile', { user, endedPolls, unEndedPolls });
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;