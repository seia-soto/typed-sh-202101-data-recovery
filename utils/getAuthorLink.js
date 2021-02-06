const { baseURL } = require('../config')

module.exports = (author, page) => {
  let url = baseURL + '/author/' + author

  if (page >= 2) {
    url += '/page/' + page
  }

  return url
}
