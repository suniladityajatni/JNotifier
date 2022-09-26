const request=require('request');
const cheerio = require('cheerio');
const axios = require('axios');

async function getShareChatJobs()
{
    const cb= async (err,res,html)=>{
        console.log("Before");
        if(err)
        {
            console.log(err);
            return;
        }
        return extractHtml(html);
    }
    const extractHtml = async (html) => {
        const jobs=[]
        // console.log(html);
        const $=cheerio.load(html);
        const jobOpeningNames=$("h3.js-job-list-opening-name")
        const jobOpeningURL=$(".js-careers-page-job-list-item a")
        const arr=$(jobOpeningNames)
        const link=$(jobOpeningURL)
        for(let i=0;i<arr.length;i++) {
            const href=$(link[i]).attr("href");
            jobs.push({
                companyName:'ShareChat',
                name:$(arr[i]).text().trim(),
                url:`https://sharechat.hire.trakstar.com${href}`,
                id: href.split("/")[2].trim(),
                jd:"",
                location: 'india',
            })  
        }
        // console.log(jobs)
        return jobs;
    }
    const url="https://sharechat.hire.trakstar.com/?country=India&team_id=25506&team_id=25508&q=&limit=100";
    const res=await axios.get(url);
    const jobs=cb(false,false,res.data)
    // console.log(jobs);
    return jobs;
}

module.exports =getShareChatJobs