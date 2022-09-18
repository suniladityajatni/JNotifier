const axios = require('axios');

async function getGoogleJobs() {
    const allJobs=[]
    for(let pageno=1;pageno<=2;pageno++)
    {
        const url=`https://careers.google.com/api/v3/search/?degree=ASSOCIATE&degree=BACHELORS&degree=DOCTORATE&degree=MASTERS&distance=50&hl=en_US&jex=ENTRY_LEVEL&jlo=en_US&location=India&q=Software%20Engineering&page=${pageno}`
        try {
            const response = await axios.get(url);
            const jobs = response.data.jobs;
            // console.log(type)
            const result = jobs.map(job => {
                return {
                    companyName: 'Google',
                    id: job.id.slice(5),
                    name: job.title,
                    url: `https://careers.google.com/jobs/results/${job.id.slice(5)}`,
                    jd: `${job.responsibilities} ${job.qualifications} ${job.description}`,
                    location: 'india',
                };
            })
            for(let i=0;i<result.length;i++){
                allJobs.push(result[i]);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    console.log(allJobs.length);
    return allJobs;
}

module.exports =getGoogleJobs