const router = require('express').Router();
const { isAuthenticated } = require('../utils/isAuth');
const { createPollGetController, createPollPostController, postCommentController, getPollController } = require("../controllers/poll.controllers")

router.get('/create-poll', isAuthenticated, createPollGetController)

router.post('/create-poll', createPollPostController);

router.post('/post-comment', postCommentController)

router.get('/poll', isAuthenticated, getPollController)

module.exports = router;