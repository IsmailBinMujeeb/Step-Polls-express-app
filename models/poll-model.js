const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({

    pollQuestion: {
        type: String,
        require: true,
        maxLength: 51
    },

    pollOptions: [],

    pollOperator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },

    createdAt: {

        type: Date,
        default: Date.now
    },

    pollDuration: {

        type: Date,
        require: true
    }
})

module.exports = mongoose.model('polls', pollSchema);