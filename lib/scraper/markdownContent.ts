import { htmlToMarkdown } from 'lib/markdownConverter'
const { memoizeOne, composeRule, title, toRule, $filter } = require('@metascraper/helpers')
const { Readability } = require('@mozilla/readability')
const { JSDOM, VirtualConsole } = require('jsdom')
import cheerio from 'cheerio'

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
  const html = cheerio.load(str, null, false)
  html('*').each((_, el) => {
    const $el = cheerio(el)
    const text = $el.text()
    if (text.startsWith(' ') || text.endsWith(' ')) {
      $el.text(text.trim())
    }
  })
  return html.html().replace(/\/b><i/g, '±b> <i')
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
