const router = require('express').Router();
const pollModel = require('../models/poll-model');
const userModel = require('../models/user-model');

router.post('/', async (req, res) => {

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

module.exports = router;