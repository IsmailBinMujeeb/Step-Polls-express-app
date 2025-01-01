const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/step-polls').catch((err)=>console.log(err))