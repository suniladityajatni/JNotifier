// const puppeteer=require("puppeteer");

// let page;
// let BP;
// console.log("Before");
// const browserOpenpromise=puppeteer.launch({
//     headless:false,
//     dumpio:true,
// });

// browserOpenpromise.then(function(browser){
//     const pagesArrpromise=browser.pages();
//     return pagesArrpromise;
// })
// .then(function(browserPages){
//     BP=browserPages;
//     page=browserPages[0];
//     let gotoPromise=page.goto("https://careers.microsoft.com/students/us/en/search-results?keywords=software%20engineering");
//     return gotoPromise;
// })
// .then(function(){
//     let visible=page.waitForSelector("body > section > div > div > div > div.cookie-button-area > button.btn.primary-button.au-target");
//     return visible;
// })  
// .then(function(){               
//     let clickPromise=page.click("body > section > div > div > div > div.cookie-button-area > button.btn.primary-button.au-target");
//     return clickPromise;
// })
// .then(function(){
//     let visible=page.waitForSelector("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.au-target.panel-heading > span > button");
//     return visible;
// }) 
// .then(function(){
//     let slider=page.click("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.au-target.panel-heading > span > button");
//     return slider;
// })
// .then(function(){
//     let visible=page.waitForSelector("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.panel-collapse.collapse.in > div > div.phs-facet-results > ul > li:nth-child(4) > label > span.checkbox");
//     return visible;
// }) 
// .then(function(){
//     let checkbox=page.click("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.panel-collapse.collapse.in > div > div.phs-facet-results > ul > li:nth-child(4) > label > span.checkbox");
//     return checkbox;
// })
// .then(function () {
//     let visible=page.waitForSelector("ul > li > div > div >div > h2> a")
//     return visible;
// })
// .then(async function () {
//     console.log("HEllo");
//     const data= await page.evaluate(() => {
//         console.log(document);
//         // let items=document.querySelectorAll("ul > li > div > div >div > h2> a");
//         // console.log(items);
//         // console.log("HEllo uuu");
//         return document;
//     })
//     console.log("HEllo ttt");
//     return data;
// })
// .then(function (data) {
//     console.log(data);
//     console.log("Done rr");
// })
// .catch(function(err){
//     console.log(err);
// })




const puppeteer=require('puppeteer');
async function getMicrosoftJobs(){
    const browserOpenpromise=await puppeteer.launch({
        'args' : [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
    const pagesArrpromise=await browserOpenpromise.pages();
    const page=pagesArrpromise[0];
    let gotoPromise=await page.goto("https://careers.microsoft.com/students/us/en/search-results");
    let visible1=await page.waitForSelector("body > section > div > div > div > div.cookie-button-area > button.btn.primary-button.au-target");
    let clickPromise=await page.click("body > section > div > div > div > div.cookie-button-area > button.btn.primary-button.au-target");
    let visible2=await page.waitForSelector("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.au-target.panel-heading > span > button");
    let slider=await page.click("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.au-target.panel-heading > span > button");
    let visible3=await page.waitForSelector("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.panel-collapse.collapse.in > div > div.phs-facet-results > ul > li:nth-child(4) > label > span.checkbox");
    let checkboxNumber=-1;
    checkboxNumber=await page.evaluate(async () => {
        let NumberOfLis= document.querySelector("body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.panel-collapse.collapse.in > div > div.phs-facet-results > ul").getElementsByTagName("li").length;
        let v=-1;
        for(let i=0;i<NumberOfLis;i++) {
            let name=document.querySelector(`body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.panel-collapse.collapse.in > div > div.phs-facet-results > ul`).querySelectorAll("li")[i].querySelectorAll("label  span")[1].innerHTML.split("\n")[0]
            if(name=='India')
            {
                v=i+1;
            }
        }
        return v;
    })
    console.log(checkboxNumber)
    if(checkboxNumber==-1)
        return [];
    let checkbox=await page.click(`body > div.ph-page > div.body-wrapper.ph-page-container > div > div.row > div.col-md-4.col-sm-5.addition-padding > section:nth-child(1) > div > div > div.au-target.phs-filter-panels.show > div:nth-child(3) > div.panel-collapse.collapse.in > div > div.phs-facet-results > ul > li:nth-child(${checkboxNumber}) > label > span.checkbox`);
    await new Promise(done => setTimeout(() => done(), 5000));
    const data=await page.evaluate(() => {
        const list=document.querySelectorAll("ul > li > div > div > div > h2 > a");
        const flist=[];
        for(let i=0;i<list.length;i++) {
            flist.push(list[i].href);
        }
        return flist;
    })
    
    await browserOpenpromise.close();
    // console.log(data);
    const finalData=[];
    for(let i=0;i<data.length;i++) {
        const href=data[i];
        finalData.push({
            url:href,
            name:href.slice(57),
            companyName:"Microsoft",
            location:"India",
            jd:"",
            id:href.slice(49,56),
        });
    }
    return finalData;
}

// getMicrosoftJobs();
module.exports =getMicrosoftJobs;