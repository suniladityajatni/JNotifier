const nodemailer = require('nodemailer');
const ejs=require("ejs");

var EMAIL="";
var PASSWORD="";

const config = async (data)=>{
    EMAIL = data.Email;
    PASSWORD = data.Password;
}
// function to send mails to clients
async function sendJoiningMessage(email) {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });


    const filePath = "views/joiningEmail.ejs";
    const data = await ejs.renderFile(filePath);

    
        var mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'Job Openings',
            html: data
        };
        transporter.sendMail(mailOptions,function(err,info){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(`Email sent sucessfully to ${email}`+info)
            }
        })
}

module.exports.config = config;
module.exports.sendJoiningMessage = sendJoiningMessage;