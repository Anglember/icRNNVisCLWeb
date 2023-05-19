const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser());
const appData = require('../public/layout/layoutdata.json')
const apiRoutes = express.Router()
var fs = require('fs');
apiRoutes.get('/layoutdata', (req, res) => {
    res.json({
        errno: 0,
        data: appData
    })
})
apiRoutes.post('/savedata', (req, res) => {
    console.log(req.body);
    res.send('数据已接收')
    let str = JSON.stringify(req.body)
    fs.writeFile('public/layout/layoutdata.json', str, function (err) {
        if (err) {
            res.status(500).send('Server is error...')
        } else {
            console.log('写入成功');
        }
    })
})
app.use('/', apiRoutes)
app.listen(8081, () => {
    console.log('mock data is Running')
})