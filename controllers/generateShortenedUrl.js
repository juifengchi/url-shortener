async function generateShortenedUrl () {
  const Url = require('../models/url')
  const numbers = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const collection = numbers.split('').concat(lowerCaseLetters.split(''), upperCaseLetters.split(''))
  const herokuUrl = 'http://localhost:3000/'
  let randomCode = ''

  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    randomCode += collection[index]
  }
  const shortenedUrl = herokuUrl + randomCode

  await Url.findOne({ shortenedUrl })
    .lean()
    .then(url => {
      if (url) {
        generateShortenedUrl()
      }
    })

  return shortenedUrl
}

module.exports = generateShortenedUrl
