const mongoose = require('mongoose');


// creating mongoose schema to store the jobs results
const jobSchema = new mongoose.Schema({
    companyName: String,
    id: String,
    name: String,
    url: String,
    jd: String,
    location: String,
});



// creating model for the jobs schema
const Job = mongoose.model('Job', jobSchema);


module.exports=Job;