const router = require('express').Router();
const { voteController } = require('../controllers/vote.controllers')

router.get('/', voteController)

module.exports = router;