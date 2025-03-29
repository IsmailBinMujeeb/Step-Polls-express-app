const router = require('express').Router();
const { isAuthenticated } = require('../utils/isAuth');
const { profileController } = require("../controllers/profile.controller")

router.get('/', isAuthenticated, profileController)

module.exports = router;