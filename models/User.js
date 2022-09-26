const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
       type: String,
       unique: true
    }
});

// creating model for the users schema
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports =User;