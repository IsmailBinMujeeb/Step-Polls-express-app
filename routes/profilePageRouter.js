const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/authentication.middleware');
const { profileController } = require("../controllers/profile.controller")

router.get('/', isAuthenticated, profileController)

module.exports = router;