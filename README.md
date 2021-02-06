# Typed.SH 2021/01 Data Recovery

이 프로젝트는 Wayback Machine을 사용하여 작성한 글의 텍스트 데이터를 JSON으로 모두 복구시켜줍니다.

## Usage

`index.js`를 열고 `getPostListOfAuthor` 함수의 인자를 수정합니다.

```js
const fs = require('fs')

const getPostListOfAuthor = require('./fns/getPostListOfAuthor')
const getPostContent = require('./fns/getPostContent')

const init = async () => {
  const pages = await getPostListOfAuthor('<USERNAME>')
  const result = []

  for (let i = 0, l = pages.length; i < l; i++) {
    const page = pages[i]

    for (let k = 0, s = page.length; k < s; k++) {
      const post = page[k]

      console.log('recovering contents of', post.title, post.link)

      post.data = await getPostContent(post.link)

      result.push(post)
    }
  }

  fs.writeFileSync('./result.json', JSON.stringify(result), 'utf8')
}

init()
```
