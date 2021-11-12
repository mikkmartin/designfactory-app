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

const fixWhiteSpace = str => {
  function fix(reg, fromFront: boolean) {
    const matches = str.matchAll(reg)
    for (const match of matches) {
      let m = match[0]
      const mLength = m.length
      const index = match.index
      if (fromFront) m = `${m.slice(1, mLength)} `
      if (!fromFront && m.endsWith(' ')) m = `> ${m.slice(1, mLength - 1)}`
      str = str.slice(0, index) + m + str.slice(index + mLength)
    }
  }
  fix(/ <[^>]*></g, true)
  fix(/><[^>]*> /g, false)
  return str
}

const getReadbility = composeRule(($, url) => readability(url, $.html()))
const toTitle = toRule(title)
const toMarkDown = async el => {
  const rawHtml = el.html()
  if (!rawHtml) return
  const html = fixWhiteSpace(rawHtml)
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
