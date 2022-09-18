const axios=require('axios');

const getUberJobs = async () =>{
    const url="https://www.uber.com/api/loadSearchJobsResults?localeCode=en";
    const headers={
        "x-csrf-token": 'x',
        "content-type": "application/json",

    }
    const postData={"params":{"location":[{"country":"IND","region":"Karnataka","city":"Bangalore"},{"country":"IND","region":"Andhra Pradesh","city":"Visakhapatnam"},{"country":"IND","region":"Telangana","city":"Hyderabad"},{"country":"IND","region":"Haryana","city":"Gurgaon"},{"country":"IND","city":"Remote"},{"country":"IND","city":"Karnataka"}]},"limit":1000,"page":0};

    const res=await axios({
        url: url,
        data: postData,
        headers: headers,
        method: 'POST',
    });
    const jobs=res.data.data.results;
    const finalJobs=[];
    for(let i=0;i<jobs.length;i++){
        finalJobs.push({
            id:jobs[i].id,
            name:jobs[i].title,
            jd:jobs[i].description,
            location:jobs[i].location.countryName,
            companyName:"Uber",
            url:"https://www.uber.com/global/en/careers/list/"+jobs[i].id+"/"
        })
    }
    return finalJobs;
}

module.exports=getUberJobs;