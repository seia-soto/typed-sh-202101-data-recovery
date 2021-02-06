const cheerio = require('cheerio')

module.exports = html => {
  const post = {}
  const $ = cheerio.load(html)

  const header = $('header.post-full-header')
  const content = $('section.post-full-content > div.post-content')

  post.title = header.find('h1.post-full-title').text()
  post.author = header.find('h4.author-name').text()
  post.createdAt = header.find('time.byline-meta-date').attr('datetime')
  post.tags = []
  post.contents = ''

  header.find('section.post-full-tags').each((i, tag) => {
    post.tags.push($(tag).text())
  })
  content.children().each((index, element) => {
    const child = $(element)

    const type = element.tagName
    const context = child.text()

    switch (type) {
      case 'p': {
        post.contents += context

        break
      }
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6': {
        const iteration = Number(type.replace('h', ''))

        for (let i = 0; i < iteration; i++) {
          post.contents += '#'
        }

        post.contents += ' ' + context

        break
      }
      case 'pre': {
        const classNames = child.attr('class') || ''
        const [language] = classNames.split(' ').filter(className => className.includes('language-'))

        post.contents += '```' + (language || '') + '\n'
        post.contents += context
        post.contents += '\n```'

        break
      }
      case 'ul': {
        child.find('li').each((i, list) => {
          const node = $(list)

          post.contents += '- ' + node.text() + '\n'
        })

        break
      }
      default: {
        post.contents += context
      }
    }

    post.contents += '\n\n'
  })

  return post
}
