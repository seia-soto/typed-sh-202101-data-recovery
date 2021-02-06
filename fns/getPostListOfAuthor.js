const getArchivedPage = require('../archive/getArchivedPage')
const getAvailability = require('../archive/getAvailability')
const parsePostList = require('../page/parsePostList')
const getAuthorLink = require('../utils/getAuthorLink')
const getUnprefixedLink = require('../utils/getUnprefixedLink')

module.exports = async author => {
  const results = []
  let pageIndex = 1

  while (1) {
    const url = getAuthorLink(author, pageIndex)
    const closestArchive = await getAvailability(url)

    if (!closestArchive) break

    const html = await getArchivedPage(closestArchive)
    const items = await parsePostList(html)

    if (!items.length) break

    for (let i = 0, l = items.length; i < l; i++) {
      const link = items[i].link

      items[i].link = getUnprefixedLink(link, closestArchive.timestamp)
    }

    results.push(items)

    pageIndex++
  }

  return results
}
