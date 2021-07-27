function generateRandomUrl () {
  const numbers = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()

  const collection = numbers.split('').concat(lowerCaseLetters.split(''), upperCaseLetters.split(''))
  let url = ''
  for (let i = 0; i < 5 ; i++) {
    const index = Math.floor(Math.random() * collection.length)
    url += collection[index]
  }
  return url
}

module.exports = generateRandomUrl
