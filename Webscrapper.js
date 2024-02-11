//Ascrapper

const { delay } = require("lodash");
const puppeteer = require("puppeteer");


(async () => {
  

const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();



await page.goto('https://connections.arabhealthonline.com/widget/event/arab-health-2024-1/exhibitors/RXZlbnRWaWV3XzY3MzE2MA==?filters=RmllbGREZWZpbml0aW9uXzYzNTk0NA%253D%253D%3ARmllbGRWYWx1ZV8yMDU2MDQwMw%253D%253D', {timeout: 0});

// await page.setViewport({width: 1080, height: 1024});
let ph =-1;
let ms = 100;
let sc = 0;
while (sc < ms){
    await page.evaluate(() => {window.scrollTo(0,document.body.scrollHeight)});
    await page.waitForTimeout(1000)
    let nh = await page.evaluate(() =>{document.body.scrollHeight})
    if (nh == ph){
        break
    }    
    ph = nh
    sc +=1
}



// const link = await page.$$eval('.infinite-scroll-component h2',ia=> ia.innerText , {timeout: 0});
const searchValue = await page.$$eval('.infinite-scroll-component a .grid__Grid-cmp__sc-byxlcx-8.gPyOfw .clamp__Clamp-ui__sc-1aq2rfp-0.grid__Name-cmp__sc-byxlcx-4.hBkBcp.gNwjVo', 

allas => {
    return allas.map(name => name.innerText);}, {timeout: 0});
// console.log(link);
console.log(searchValue.length);

})();







//S2
const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

async function getpara(url,page){
  

  await page.goto(url);

 
  const h1 = await page.$eval(".product_main h1", h1=> h1.textContent);
  const price = await page.$eval(".product_main .price_color", pri=> pri.textContent);
  const availability = await page.$eval(".product_main .instock.availability", ia=> ia.innerText);
  
  console.log(h1);
  console.log(price);
  console.log(availability);

   return {
    title: h1,
    price: price,
    instock:  availability
   }
};

async function getlink(){
    
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://books.toscrape.com/');
await page.setViewport({width: 1080, height: 1024});
    const link = await page.$$eval('.product_pod .image_container a', allas => {
      return allas.map(a => a.href);
    });

    return link;
}

async function main(){
  const allk = await getlink();
  console.log(allk);
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  const scrd = [];
    for(let li of allk){
        const data = await getpara(li,page)
        
        scrd.push(data);
        console.log("dddd ="+ data)
    

    }

    const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(scrd);
xlsx.utils.book_append_sheet(wb, ws);
xlsx.writeFile(wb,"book5.xlsx");

await browser.close();


console.log("done");  
console.log(scrd);  
}
main();




// S1
const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

(async () => {
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://books.toscrape.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});
  const link = await page.$$eval('.product_pod .image_container a', allas => {
    return allas.map(a => a.href);
  });
console.log(link)
  await browser.close();
  
  const aoalink = link.map(l => [l]);
  
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.aoa_to_sheet(aoalink);
xlsx.utils.book_append_sheet(wb, ws);
xlsx.writeFile(wb,"link.xlsx");

})();

