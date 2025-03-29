const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');

const signupGetController = (req, res) => {
    res.render('signup');
}

const signupPostController = async (req, res) => {
    try {

        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.send("password does not match");

        const isEmailExist = await userModel.findOne({ email });

        if (isEmailExist) return res.send('Email already exist');

        bcrypt.hash(password, 10, async (err, hashed) => {
            const newUser = await userModel.create({ name, email, password: hashed });

            req.login(newUser, (err) => {
                if (err) return next(err);

                return res.redirect('/');
            })
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = { signupGetController, signupPostController }