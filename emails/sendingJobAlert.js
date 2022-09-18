const nodemailer = require('nodemailer');
const ejs=require("ejs");
const User=require("../models/User.js");

var EMAIL="";
var PASSWORD="";

const config = async (data)=>{
    EMAIL = data.Email;
    PASSWORD = data.Password;
}
// function to send mails to clients
async function sendAlert(jobs) {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });


    const filePath = "views/alertEmail.ejs";
    const data = await ejs.renderFile(filePath, { jobs });

    if (jobs.length == 0)
        return;
        
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
        var mailOptions = {
            from: 'jobopeningsofcompanies@gmail.com',
            to: `${users[i].email}`,
            subject: 'Job Openings',
            html: data
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent to ${users[i].email}: ` + info.response);
            }
        });
    }
}

module.exports.config = config;
module.exports.sendAlert = sendAlert;