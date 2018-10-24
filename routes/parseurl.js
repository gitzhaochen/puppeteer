const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer');//引入puppeteer库.
const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const jsdom = require("jsdom");
const dayjs = require('dayjs');
const Readability = require('../lib/Readability')
const {JSDOM} = jsdom;
const config = {
    width: 1600,
    height: 1080
}

function _now() {
    return dayjs().format('YYYY/MM/DD HH:mm:ss');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

function asyncParse(html) {
    // console.log(html)
    let {document} = (new JSDOM(html)).window;
    let documentJson = new Readability(document).parse();
    if (documentJson && documentJson.content) {
        return documentJson
    } else {
        return 'error'
    }

};

// function saveHtml(html) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile('public/example.txt', html, (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(console.log('写入完成'))
//         });
//     })
//
// }

async function screenShot(domHeight, page, img_name) {
    console.log('开始截图：' + _now())
    let maxScreenshotHeight = 16384;
    let imgLen = 0;
    for (let ypos = 0, idx = 0; ypos < domHeight; ypos += maxScreenshotHeight) {
        idx++;
        imgLen++;
        const height = Math.min(domHeight - ypos, maxScreenshotHeight);
        await page.screenshot({
            path: `public/${img_name}-${idx}.jpeg`,
            type: 'jpeg',
            quality: 80,
            clip: {
                x: 0,
                y: ypos,
                width: config.width,
                height
            }
        });
    }
    return new Promise((resolve, reject) => {
        let gm_res = gm(`public/${img_name}-1.jpeg`);
        if (imgLen > 1) {
            for (let i = 1; i <= imgLen; i++) {
                gm_res.append(`public/${img_name}-${i}.jpeg`)
            }
        }
        gm_res.write(`public/${img_name}.jpeg`, function (err) {
            //删除多余文件
            for (let i = 1; i <= imgLen; i++) {
                fs.unlink(`./public/${img_name}-${i}.jpeg`, function(error) {
                    if (error) throw error;
                });
            }
            if (!err) {
                resolve(console.log('合成完成：' + _now()))
            }
            else {
                reject(err);
            }
        });
    })
}

async function capture(browser, url, img_name, res) {
    console.log('打开页面：' + _now())
    const page = await browser.newPage();
    await page.setViewport({width: config.width, height: config.height});
    try{
        await page.goto(url, {waitUntil: 'networkidle0'});
        console.log('打开页面完成：' + _now())
    }catch(err){
        console.error('打开页面错误******************：' + _now())
    }
    const dom = await page.evaluate(async () => {
        let dom = {
            height: document.body.scrollHeight,
            html: document.documentElement.outerHTML
        };

        await new Promise((resolve, reject) => {
            let totalHeight = 0
            let distance = 100
            let timer = setInterval(() => {
                window.scrollBy(0, distance)
                dom.height=document.body.scrollHeight
                totalHeight += distance
                if (totalHeight >= dom.height) {
                    clearInterval(timer)
                    resolve()
                }
            }, 50)
        });

        return dom
    });
    console.log('滚动页面：' + _now() + '-----domHeight:' + dom.height)
    // await page.setViewport({width: config.width, height: dom.height});
    try {
        await page.waitForSelector('img');
        console.log('图片加载完成：' + _now())
    } catch (err) {
        console.error('图片加载错误***********************：' + _now())
    }
    await page.evaluate(async () => {
        window.scroll(0, 0);
    });
    await sleep(50)
    let documentJson=asyncParse(dom.html);//获取网页html
    try{
        await screenShot(dom.height, page, img_name)
        res.json({img_name: `${img_name}.jpeg`,...documentJson});
    }catch(err){
        res.json({img_name: false,...documentJson});
    }

    console.log('end：' + _now())
    await page.close()
}

let browser;
(async function () {
    browser = await puppeteer.launch();
}())
router.get('/', (req, res, next) => {
    (async function () {
        console.log(req.query.url)
        let url = req.query.url;
        let img_name = req.query.img_name;
        capture(browser, url, img_name, res)
    }())
});

module.exports = router;