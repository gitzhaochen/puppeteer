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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://music.163.com',{waitUntil:'networkidle0'});
    let iframeDom=''
    const dom = await page.evaluate(async () => {
        let iframe=document.getElementById('g_iframe').contentWindow;
        iframeDom=iframe.document;
        let dom= {height: iframeDom.body.scrollHeight,html:iframeDom.documentElement.outerHTML};
        // await scrollPage(iframe)
        return dom
    });
    await page.setViewport({width: 1920, height: dom.height});
    console.log('dom高度:'+dom.height)
    await saveHtml(dom.html)
    await page.screenshot({path: "public/example.png", clip: {x: 0, y: 0, width: 1920, height: dom.height}});
    await browser.close();
})();
