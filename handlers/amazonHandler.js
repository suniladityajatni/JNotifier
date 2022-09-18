const axios=require('axios');

async function getAmazonJobs(){
    const url="https://www.amazon.jobs/en/search.json?category%5B%5D=systems-quality-security-engineering&category%5B%5D=operations-it-support-engineering&category%5B%5D=machine-learning-science&category%5B%5D=software-development&normalized_country_code%5B%5D=IND&business_category%5B%5D=student-programs&radius=24km&is_manager%5B%5D=0&facets%5B%5D=normalized_country_code&facets%5B%5D=normalized_state_name&facets%5B%5D=normalized_city_name&facets%5B%5D=location&facets%5B%5D=business_category&facets%5B%5D=category&facets%5B%5D=schedule_type_id&facets%5B%5D=employee_class&facets%5B%5D=normalized_location&facets%5B%5D=job_function_id&facets%5B%5D=is_manager&facets%5B%5D=is_intern&offset=0&result_limit=10&sort=relevant&latitude=&longitude=&loc_group_id=&loc_query=India&base_query=Software%20Development&city=&country=IND&region=&county=&query_options=&"
    const response=await axios.get(url);
    const jobs=response.data.jobs;
    // console.log(jobs);
    const finalJobs=[];
    return jobs.map(job => {
        return {
            companyName:'Amazon',
            name:job.title,
            id:job.id_icims,
            url:"https://www.amazon.jobs"+job.job_path,
            location:job.country_code,
            jd:job.basic_qualifications
        }
    })
}


module.exports = getAmazonJobs;