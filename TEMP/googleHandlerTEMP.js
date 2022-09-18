// const cheerio = require('cheerio');
const axios = require('axios');

const url="https://careers.google.com/api/v3/search/?degree=BACHELORS&degree=MASTERS&distance=50&hl=en_US&jex=ENTRY_LEVEL&jlo=en_US&location=India&q=Software%20Engineer";


async function getJob(){
    try{
        const response = await axios.get(url);
        const jobs = response.data.jobs;
        // console.log(type)
        const result= jobs.map(job => {
            return {
                id: job.id,
                name: job.title,
                url: job.apply_url,
                jd: `${job.responsibilities}\n${job.qualifications}\n${job.description}`,
                location: 'india',
            };
        })
        return result;
    }
    catch(e)
    {
        console.error(e);
    }
}
const result=await getJob();
console.log(result);
// export default getJob

// import axios from 'axios';

// // const url = 'https://careers.google.com/api/v3/search/?degree=BACHELORS&degree=MASTERS&distance=50&hl=en_US&jex=ENTRY_LEVEL&jlo=en_US&location=India&q=Software%20Engineer';
// // const name = 'google';

// const googleHandler={
//     "url":'https://careers.google.com/api/v3/search/?degree=BACHELORS&degree=MASTERS&distance=50&hl=en_US&jex=ENTRY_LEVEL&jlo=en_US&location=India&q=Software%20Engineer',
//     "name":"google",
//     "getJobs": async () => {
//         const googleAPIRes = await axios.get(url);
//         const jobs = googleAPIRes.data.jobs;
//         const result = jobs.map(job => {
//             return {
//                 id: job.id,
//                 name: job.title,
//                 url: job.apply_url,
//                 jd: `${job.responsibilities}\n${job.qualifications}\n${job.description}`,
//                 location: 'india',
//                 companyName: name,
//             };
//         })

//         return result;
//     }
// };

// export default googleHandler;