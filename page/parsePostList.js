const cheerio = require('cheerio')

module.exports = html => {
  const $ = cheerio.load(html)
  const items = []

  $('article.post-card.post').each((index, element) => {
    const title = $(element).find('h2.post-card-title').text()
    const link = $(element).find('a.post-card-content-link').attr('href')

    console.log('recovered', title, link)

    items.push({
      title,
      link
    })
  })

  return items
}
