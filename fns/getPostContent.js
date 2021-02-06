const getArchivedPage = require('../archive/getArchivedPage')
const getAvailability = require('../archive/getAvailability')
const parsePostContent = require('../page/parsePostContent')

module.exports = async url => {
  const closestArchive = await getAvailability(url)

  if (!closestArchive) return false

  const html = await getArchivedPage(closestArchive)
  const post = await parsePostContent(html)

  return post
}
