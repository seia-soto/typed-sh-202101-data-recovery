module.exports = (url, timestamp) => {
  return url.replace('/web/' + timestamp + '/', '')
}
