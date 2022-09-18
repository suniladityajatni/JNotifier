const mongoose = require('mongoose');


module.exports = (MONGO_URL) => {
    mongoose.connect(MONGO_URL, () => {
        console.log("Connected to the database");
    });
}