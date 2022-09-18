const nodemailer = require('nodemailer');

var EMAIL="";
var PASSWORD="";
const config = async (Data)=>{
    console.log(Data)
    EMAIL = Data.Email;
    PASSWORD = Data.Password;
    console.log(EMAIL);
    console.log(PASSWORD);
    console.log(typeof EMAIL);
    console.log(typeof PASSWORD);
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

module.exports.config   = config;
module.exports.transporter = transporter;