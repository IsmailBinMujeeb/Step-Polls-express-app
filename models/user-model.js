const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    googleId: {

        type: String,
    },

    name: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true,
    },

    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'polls',
        default: []
    }]
})

module.exports = mongoose.model('users', userSchema);