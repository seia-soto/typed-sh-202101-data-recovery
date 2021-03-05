const { EOL } = require('os')

module.exports = (author, data) => {
  const file = []

  file.push('---')
  file.push('title: ' + data.title)
  file.push('author: ' + author)
  file.push('date: ' + data.createdAt)
  file.push('sort: ' + data.contents.slice(0, 50) + '...')
  file.push('thumbnail: https://source.unsplash.com/random/1100x0')
  file.push('---')
  file.push('')

  file.push(data.contents)

  const content = file.join(EOL)

  return content
}
