import { htmlToMarkdown } from 'lib/markdownConverter'

const { memoizeOne, composeRule, title, toRule, $filter } = require('@metascraper/helpers')
const { Readability } = require('@mozilla/readability')
const { JSDOM, VirtualConsole } = require('jsdom')

const parseReader = reader => {
  try {
    return reader.parse()
  } catch (_) {
    return {}
  }
}

const readability = memoizeOne((url, html) => {
  const dom = new JSDOM(html, { url, virtualConsole: new VirtualConsole() })
  const reader = new Readability(dom.window.document)
  return parseReader(reader)
})

const getReadbility = composeRule(($, url) => readability(url, $.html()))
const toTitle = toRule(title)
const toMarkDown = async el => {
  const html = el.html()
  return await htmlToMarkdown(html)
}

export default () => {
  return {
    description: getReadbility({ from: 'excerpt', to: 'description' }),
    publisher: getReadbility({ from: 'siteName', to: 'publisher' }),
    author: getReadbility({ from: 'byline', to: 'author' }),
    title: [
      toTitle($ => $filter($, $('.post-title'), toMarkDown)),
      toTitle($ => $filter($, $('.entry-title'), toMarkDown)),
      toTitle($ => $filter($, $('h1[class*="title" i] a'), toMarkDown)),
      toTitle($ => $filter($, $('h1[class*="title" i]'), toMarkDown)),
      getReadbility({ from: 'title' }),
    ],
  }
}
