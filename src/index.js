require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')

const app = express()
mongoose.connect(process.env.MONGO_URI, { 'useNewUrlParser' : true,useUnifiedTopology: true })

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('/api/hello', (req, res) => {
    res.json({ greeting: 'hello API' });
});
app.use('/api/shorturl', router);

app.listen(app.get('port'), console.log(`Listening on port: ${app.get('port')}`))