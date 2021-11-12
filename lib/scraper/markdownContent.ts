import { htmlToMarkdown } from 'lib/markdownConverter'
const { title, toRule, $filter } = require('@metascraper/helpers')
import cheerio from 'cheerio'

const fixWhiteSpace = str => {
  const html = cheerio.load(str, null, false)
  html('*').each((_, el) => {
    const $el = cheerio(el)
    const text = $el.text()
    if (text.startsWith(' ') || text.endsWith(' ')) {
      $el.text(text.trim())
    }
  })
  return html.html().replace(/\/b><i/g, '/b> <i')
}

const toTitle = toRule(title)
const toMarkDown = async el => {
  const rawHtml = el.html()
  if (!rawHtml) return
  const html = fixWhiteSpace(rawHtml)
  return await htmlToMarkdown(html)
}

export default () => {
  return {
    title: [
      toTitle($ => $filter($, $('.post-title'), toMarkDown)),
      toTitle($ => $filter($, $('.entry-title'), toMarkDown)),
      toTitle($ => $filter($, $('h1[class*="title" i] a'), toMarkDown)),
      toTitle($ => $filter($, $('h1[class*="title" i]'), toMarkDown)),
    ],
  }
}
