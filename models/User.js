const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
});

// creating model for the users schema
const User = mongoose.model('User', userSchema);

module.exports =User;