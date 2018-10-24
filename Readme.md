## 动态网页抓取html及截图
> 解决图片lazyload、页面内容超长、截图不完整问题

1. puppteer网页截图工具、https://pptr.dev/#?product=Puppeteer&version=v1.9.0
2. gm图片处理库、https://github.com/aheckmann/gm
3. mozilla readability网页主体抓取算法，https://github.com/mozilla/readability

## useage

- npm i 安装依赖
- node server.js 跑express服务3333端口、监听请求
- postman模拟get请求，地址输入```http://localhost:3333/parseurl?url=http://news.baidu.com&img_name=baidu```
    - url:必填、请求网页地址
    - img_name:必填、截屏生成的图片名称， 浏览器查看http://localhost:3333/img_name.jpeg
- 返回如下：
    ``` 
    {
        "img_name": "baidu.jpeg",
        "title": "百度新闻——全球最大的中文新闻平台",
        "byline": null,
        "dir": null,
        "content": "<div id=\"readability-page-1\" class=\"page\"><div id=\"footerwrapper\">\n<div alog-group=\"log-footer-bottombar\" alog-alias=\"hunter-start-bottombar\">\n<div>\n<div>\n<div>\n<h4>更多精彩内容</h4>\n</div>\n<div>\n<p><img src=\"//gss0.bdstatic.com/5foIcy0a2gI2n2jgoY3K/static/fisp_static/common/img/footer/1014720b_45d192d.png\">\n</p>\n<div>\n<p><a href=\"http://downpack.baidu.com/baidunews_AndroidPhone_1014720b.apk\" target=\"_blank\">Android版下载</a>\n<a href=\"https://itunes.apple.com/cn/app/id482820737\" target=\"_blank\">iPhone版下载</a>\n</p></div>\n<p>扫描二维码, 收看更多新闻</p>\n</div>\n</div>\n<div>\n<div>\n<h4>百度新闻独家出品</h4>\n</div>\n<ol>\n<li>1. 新闻由机器选取每5分钟自动更新</li>\n<li>2. 百度新闻搜索源于互联网新闻网站和频道，系统自动分类排序</li>\n<li>3. 百度不刊登或转载任何完整的新闻内容</li>\n</ol>\n</div>\n</div>\n</div>\n<p>\n责任编辑：胡彦BN098 刘石娟BN068 谢建BN085 李芳雨BN091 储信艳BN087 焦碧碧BN084 禤聪BN095 王鑫BN060 崔超BN071 违法和不良信息举报电话：010-59922128</p>\n<div id=\"footer\" alog-group=\"log-footer\" alog-alias=\"hunter-start-footer\">\n<p><a href=\"https://news.baidu.com/z/resource/wap/protocol/baidu_news_protocol.html\">用户协议</a>\n<a href=\"https://www.baidu.com/duty/wise/wise_secretright.html\">隐私策略</a>\n<a href=\"//help.baidu.com/newadd?prod_id=5&amp;category=1\">投诉中心</a>\n<span>京公网安备11000002000001号</span>\n<a href=\"//news.baidu.com/licence.html\">互联网新闻信息服务许可</a>\n<span>©2018Baidu</span>\n<a href=\"//www.baidu.com/duty/\">使用百度前必读</a>\n<a target=\"_blank\" href=\"http://net.china.cn/chinese/index.htm\">\n</a>\n<a target=\"_blank\" href=\"http://www.cyberpolice.cn/wfjb/\">\n</a>\n<a target=\"_blank\" href=\"http://www.bjjubao.org/\">\n</a>\n</p></div>\n</div></div>",
        "textContent": "\n\n\n\n\n更多精彩内容\n\n\n\n\n\nAndroid版下载\niPhone版下载\n\n扫描二维码, 收看更多新闻\n\n\n\n\n百度新闻独家出品\n\n\n1. 新闻由机器选取每5分钟自动更新\n2. 百度新闻搜索源于互联网新闻网站和频道，系统自动分类排序\n3. 百度不刊登或转载任何完整的新闻内容\n\n\n\n\n\n责任编辑：胡彦BN098 刘石娟BN068 谢建BN085 李芳雨BN091 储信艳BN087 焦碧碧BN084 禤聪BN095 王鑫BN060 崔超BN071 违法和不良信息举报电话：010-59922128\n\n用户协议\n隐私策略\n投诉中心\n京公网安备11000002000001号\n互联网新闻信息服务许可\n©2018Baidu\n使用百度前必读\n\n\n\n\n\n\n\n",
        "length": 325,
        "excerpt": "百度新闻是包含海量资讯的新闻服务平台，真实反映每时每刻的新闻热点。您可以搜索新闻事件、热点话题、人物动态、产品资讯等，快速了解它们的最新进展。"
    }
    ```