const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Url = require('./models/url')
const generateShortenedUrl = require('./controllers/generateShortenedUrl')

const herokuUrl = 'https://arcane-tor-06453.herokuapp.com/'
const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-shortener'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  let shortenedUrl = await generateShortenedUrl()
  const originalUrl = req.body.originalUrl

  Url.findOne({ originalUrl })
    .lean()
    .then(url => {
      if (url) {
        shortenedUrl = url.shortenedUrl
        return res.render('index', { originalUrl, shortenedUrl })
      }

      Url.create({ originalUrl, shortenedUrl })
        .then(() => res.render('index', { originalUrl, shortenedUrl }))
    })
    .catch(error => console.log(error))
})

app.get('/:randomCode', (req, res) => {
  const randomCode = req.params.randomCode
  const shortenedUrl = herokuUrl + randomCode
  Url.findOne({ shortenedUrl })
    .lean()
    .then(url => res.redirect(url.originalUrl))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
