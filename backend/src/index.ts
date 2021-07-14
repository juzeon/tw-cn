import {OpenCC} from 'opencc'
import express from 'express'
import bodyParser from "body-parser"


require('dotenv').config()
let app = express()
let urlencodedParser = bodyParser.urlencoded({extended: false})

let ocToCNWriting = new OpenCC('tw2s.json')
let ocToTWWriting = new OpenCC('s2tw.json')
let ocToCNSpeaking = new OpenCC('tw2sp.json')
let ocToTWSpeaking = new OpenCC('s2twp.json')
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})
app.get('/', (req, res) => {
    res.send('See /trans')
})
app.post('/trans', urlencodedParser, (req, res) => {
    let text = req.body.text || ''
    let writing = parseInt(req.query.writing as any) || 0
    let speaking = parseInt(req.query.speaking as any) || 0
    if (writing < 0 || writing > 1 || speaking < 0 || speaking > 1) {
        res.status(400).json({msg: 'Index Not Acceptable'}).end()
    }
    switch (speaking) {
        case 0:
            text = ocToCNWriting.convertSync(text)
            text = ocToTWSpeaking.convertSync(text)
            break
        case 1:
            text = ocToTWWriting.convertSync(text)
            text = ocToCNSpeaking.convertSync(text)
            break
    }
    switch (writing) {
        case 0:
            text = ocToTWWriting.convertSync(text)
            break
        case 1:
            text = ocToCNWriting.convertSync(text)
            break
    }
    res.json({text: text}).end()
})
let server = app.listen(process.env.PORT, () => {
    console.log('Server started at port ' + process.env.PORT)
})
