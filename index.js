const fs = require('fs')

const getPostListOfAuthor = require('./fns/getPostListOfAuthor')
const getPostContent = require('./fns/getPostContent')
const convertFormat = require('./utils/convertFormat')

const init = async () => {
  const author = 'gokoro'
  const pages = await getPostListOfAuthor(author)

  for (let i = 0, l = pages.length; i < l; i++) {
    const page = pages[i]

    for (let k = 0, s = page.length; k < s; k++) {
      const post = page[k]

      console.log('recovering contents of', post.title, post.link)

      post.data = await getPostContent(post.link)

      const slug = post.link
        .split('?')[0]
        .split('/')
        .slice(-2)[0] // NOTE: Take care about trailing slash!
      const loc = `./${author}/${slug}`

      if (!fs.existsSync(loc)) {
        fs.mkdirSync(loc, { recursive: true })
      }

      fs.writeFileSync(`${loc}/index.mdx`, convertFormat(author, post.data))
    }
  }
}

init()
