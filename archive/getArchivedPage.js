const fetch = require('node-fetch')

module.exports = async item => {
  if (typeof item === 'object') {
    item = item.url
  }

  console.log('downloading archived page', item)

  const response = await fetch(item)
  const page = await response.text()

  return page
}
