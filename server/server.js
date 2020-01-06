require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const controllers = require('./controllers')

const app = express()

app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use(bodyParser.json())

app.use('/api', router)

app.get('/', (req, res)=> {
    res.send('Welcome to Resume App!')
})

app.listen('3000', ()=> {
    console.log('Server running at port 3000')
})
