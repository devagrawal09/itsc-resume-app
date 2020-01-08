require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const router = require('./router')
const controllers = require('./controllers')

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use(fileUpload())

app.use('/api', router)

app.use('/static', express.static('resume-uploads'))

app.get('/', (req, res)=> {
    res.send('Welcome to Resume App!')
})

app.listen('3000', ()=> {
    console.log('Server running at port 3000')
})
