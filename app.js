const  puppeteer =require('puppeteer');//引入puppeteer库.
const fs = require('fs');

function saveHtml(html){
    return new Promise((resolve,reject)=>{
        fs.writeFile('public/example.txt', html, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(console.log('写入完成'))
        });
    })

}
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.yuanben.io/article/5X1RRRHHMQ7MZS6QVZ706E0HSQ2UCLXWPR0L7LBPZU06FARMV5',{waitUntil:'networkidle0'});
    await page.setViewport({width: 1920, height: 1080});
    const dom = await page.evaluate(() => {
        return {height: document.body.clientHeight,html:document.documentElement.outerHTML}
    });
    console.log('dom高度:'+dom.height)
    await saveHtml(dom.html)
    await page.screenshot({path: "public/example.png", clip: {x: 0, y: 0, width: 1920, height: dom.height}});
    await browser.close();
})();
