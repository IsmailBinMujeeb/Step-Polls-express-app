const router = require('express').Router();
const { signupGetController, signupPostController } = require('../controllers/signup.controller')

router.get('/', signupGetController);

router.post('/', signupPostController)

module.exports = router;