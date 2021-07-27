function generateShortenedUrl () {
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
  return herokuUrl + randomCode
}

module.exports = generateShortenedUrl
