const axios = require('axios');
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

// importing the googleHandler to fetch the google jobs
const getGoogleJobs = require(__dirname + "/handlers/googleHandler.js");
const getAmazonJobs = require(__dirname + "/handlers/amazonHandler.js");
const getMicrosoftJobs = require(__dirname + "/handlers/microsoftHandler.js");
const getUberJobs = require(__dirname + "/handlers/uberHandler.js");
const getShareChatJobs = require(__dirname + "/handlers/sharechatHandler.js");

// connecting to the database
require(__dirname + "/db.js")(process.env.MONGO_URL);

// making the schemas
const User = require(__dirname + "/models/User.js");
const Job = require(__dirname + "/models/Job.js");

// importing the job alert service
require(path.join(__dirname, "emails", "sendingJobAlert.js")).config({ "Email": process.env.EMAIL, "Password": process.env.PASSWORD });
require(path.join(__dirname, "emails", "sendingCongratulationsEmail.js")).config({ "Email": process.env.EMAIL, "Password": process.env.PASSWORD });
const sendAlert = require(path.join(__dirname, "emails", "sendingJobAlert.js")).sendAlert;
const sendJoiningMessage = require(path.join(__dirname, "emails", "sendingCongratulationsEmail.js")).sendJoiningMessage;


// importing the filter function to filter out unwanted jobs
const { filterJobs } = require(path.join(__dirname, "utils.js"));

const app = express();
app.use(express.json())
app.use(cors());



// all handles in one place
const handlers = [
    { "getJobs": getGoogleJobs, "name": "Google" },
    { "getJobs": getAmazonJobs, "name": "Amazon" },
    { "getJobs": getMicrosoftJobs, "name": "Microsoft" },
    { "getJobs": getUberJobs, "name": "Uber" },
    {"getJobs": getShareChatJobs, "name": "ShareChat" },

];



// function to save newJob openings in the database
async function saveNewJobsToDB(newJobs) {
    for (let i = 0; i < newJobs.length; i++) {
        let tempNewJob={
            companyName:newJobs[i].companyName,
            id:newJobs[i].id,
            url:newJobs[i].url
        }
        let newJob = new Job(tempNewJob);
        await newJob.save();
    }

}


// this is the crawaler which will run every 24 hours once to fetch job openings from various sites
async function runEvery24Hours() {

    const finalResult = [];
    const saveToDB = [];
    for (let i = 0; i < handlers.length; i++) {
        console.log(`Company Name ${handlers[i].name}`);
        const handler = handlers[i];
        const newJobs = await handler.getJobs();
        if(i==handlers.length-1)
            console.log(newJobs)
        console.log(`length of fetched jobs: ${newJobs.length}`);
        const filteredNewJobs = await filterJobs(newJobs);
        console.log(`length of filteredNewJobs jobs: ${filteredNewJobs.length}`);
        const oldJobs = await Job.find({ companyName: handler.name }).exec();
        console.log(`old jobs: ${oldJobs.length}`)
        // console.log(oldJobs);
        for (let i = 0; i < oldJobs.length; i++) {
            console.log(oldJobs[i].id)
        }
        for (let i = 0; i < filteredNewJobs.length; i++) {
            console.log(`filtered Jobs ${filteredNewJobs[i].id}`)
        }
        for (let i = 0; i < filteredNewJobs.length; i++) {
            var flag = 1;
            for (let j = 0; j < oldJobs.length; j++) {
                if (filteredNewJobs[i].id == oldJobs[j].id) {
                    flag = 0;
                    break;
                }
            }
            if (flag)
                finalResult.push(filteredNewJobs[i]);
            saveToDB.push(filteredNewJobs[i]);
        }
    }
    console.log(finalResult.length)
    if (finalResult.length == 0)
        return;
    await Job.deleteMany();
    // for(let i=0;i<saveToDB.length;i++){
    //     console.log(saveToDB[i].companyName);
    // }
    await saveNewJobsToDB(saveToDB);
    await sendAlert(finalResult);
    return finalResult;
}

const repeatAfter=6*3600*1000;
setInterval(() => {
    const a = runEvery24Hours();
    a.then(() => {
        console.log("END");
    })
},repeatAfter);

app.post("/user",[
    body('email').isEmail()
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({"msg":"Please eneter a valid email"});
    }
    let newEmail=req.body.email;
    let newUser = new User({ email: req.body.email });
    User.find({email:newEmail}).then((result) => {
        if(result.length)
        {
            return res.status(400).send({ "msg":"Email is already registered" })
        }
        else
        {
            newUser.save((error, result1) => {
                if (error) {
                    console.log(error);
                    return res.status(400).send({ "msg":"Email is already registered" })
                }
                else {
                    console.log(result1);
                    try
                    {
                        sendJoiningMessage(req.body.email);
                    }
                    catch{
                        return res.status(400).send({"msg":"We are having some problem to send mail to this email pls give some other email"});
                    }
                    return res.status(200).send({});
                }
            });
        }
    }).catch((err) => {
        console.log(err);
        return res.status(400).send({ "msg":"Some internal Error occured pls try after some time" })
    })
})

app.get("/server", (req, res) => {
    res.send("Hello")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} ... `);
})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("frontend/build"))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}
