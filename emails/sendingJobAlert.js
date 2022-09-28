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
    const to=[];
    for (let i = 0; i < users.length; i++) {
        to.push(users[i].email);
    }
    var mailOptions = {
        from: `"JNotifier" ${EMAIL}`,
        to: to,
        subject: 'Job Openings',
        html: data
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
            const a=info.envelope.to;
            for(let i=0;i<a.length;i++) {
                console.log(`Email sent to ${a[i]}` + info.response);
            }
        }
    });
}

module.exports.config = config;
module.exports.sendAlert = sendAlert;