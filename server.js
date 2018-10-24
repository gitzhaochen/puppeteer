const express = require('express');
const app = express();
let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
app.use(express.static('public', options))

const parseurl=require('./routes/parseurl')

app.use('/parseurl', parseurl);

app.listen(3333,()=>{
    console.log('listen on port:3333')

});
