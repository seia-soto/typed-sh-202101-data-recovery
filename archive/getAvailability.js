const fetch = require('node-fetch')
const qs = require('qs')

const { archiveAPI } = require('../config')

module.exports = async url => {
  console.log('checking archive availability of', url)

  const response = await fetch(archiveAPI + '?' + qs.stringify({ url }))
  const data = await response.json()

  const available =
    (data) &&
    (data.archived_snapshots) &&
    (data.archived_snapshots.closest) &&
    (data.archived_snapshots.closest.available)
  if (!available) {
    console.error('ERROR: cannot retrieve closest archive!')

    return false
  }

  console.log('page archive availability checked for', url)

  return data.archived_snapshots.closest
}
