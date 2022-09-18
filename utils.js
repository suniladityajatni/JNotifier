async function filterJobs(jobs) {
    const unwantedTitles = [
        ' II',
        'Manager',
        'Sr',
        'Staff',
        'Senior',
        ' 2 ',
        'Lead',
        "software engineer 2",
        "sde 2"
    ];

    const unwantedJDs = [
        '2+ years',
        '1+ years',
        '2 years',
        '1 year',
        '2 yoe',
        '1 yoe',
        '2+ yoe',
        '1+ yoe',
    ]
    const wantedTitles=[
        "sde",
        "software",
        "program"
    ]
    return jobs.filter(job => {
        for (let i=0;i<unwantedJDs.length;i++) {
            let jobd=unwantedJDs[i];
            if (job.jd.toLowerCase().includes(jobd.toLowerCase()))
                {
                    // console.log("================================================================");
                    // console.log(job.name.toLowerCase());
                    // console.log(jobd.toLowerCase());
                    // console.log("================================================================");
                    return false;
                }
        }
        for (let i=0;i<unwantedTitles.length;i++) {
            let jname=unwantedTitles[i];
            if (job.name.toLowerCase().includes(jname.toLowerCase()))
                {
                    // console.log("================================================================");
                    // console.log(jname.toLowerCase());
                    // console.log(job.name.toLowerCase());
                    // console.log("================================================================");
                    return false;}
        }
        for (let i=0;i<wantedTitles.length;i++) {
            let jname=wantedTitles[i];
            if (job.name.toLowerCase().includes(jname.toLowerCase()))
                {
                    // console.log("================================================================");
                    // console.log(jname.toLowerCase());
                    // console.log(job.name.toLowerCase());
                    // console.log("================================================================");
                    return true;
                }
        }
        return false;
    })
}

module.exports.filterJobs=filterJobs;

