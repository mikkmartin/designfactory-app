import { ServerResponse } from 'http'
import core from 'puppeteer-core'
import { getOptions } from './options'
const { performance } = require('perf_hooks')
let _page: core.Page | null

interface IGetPage {
  isDev: boolean
  res: ServerResponse
}
let perfHeader: { name: string; dur: number; desc?: string }[] = []

async function getPage({ isDev, res }: IGetPage) {
  const start = performance.now()
  if (_page) {
    perfHeader.push({
      name: 'engine',
      dur: Math.round(performance.now() - start),
      desc: 'Engine boot',
    })
    return _page
  }
  const options = await getOptions(isDev)
  const browser = await core.launch(options)
  _page = await browser.newPage()
  await _page.setJavaScriptEnabled(false)
  perfHeader.push({
    name: 'engine',
    dur: Math.round(performance.now() - start),
    desc: 'Engine boot',
  })
  return _page
}

interface IScreenshot extends IGetPage {
  supersample?: number
  timeout?: number
}

export async function getScreenshot(url, { res, isDev, supersample = 2 }: IScreenshot) {
  const page = await getPage({ isDev, res })

  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: supersample })

  let start = performance.now()
  await page.goto(url)
  perfHeader.push({
    name: 'page',
    dur: Math.round(performance.now() - start),
    desc: 'Page request',
  })

  start = performance.now()
  const selector = '#__next > div > *'
  await page.waitForSelector(selector)
  const element = await page.$(selector)

  await page.evaluate(async () => {
    const selector = '#__next > div > *'
    const selectors = Array.from(document.querySelector(selector).querySelectorAll('img'))
    await Promise.all(
      selectors.map(img => {
        if (img.complete) return
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve)
          img.addEventListener('error', reject)
        })
      })
    )
  })
  perfHeader.push({
    name: 'img',
    dur: Math.round(performance.now() - start),
    desc: 'Loading images',
  })

  start = performance.now()
  const file = await element.screenshot({ type: 'png', omitBackground: true })
  perfHeader.push({
    name: 'cap',
    dur: Math.round(performance.now() - start),
    desc: 'Image capture',
  })


  res.setHeader(
    'Server-Timing',
    perfHeader.reduce((str, { name, dur, desc }, i) => {
      if (i > 0) str += ', '
      str += `${name};dur=${dur};desc="${desc}"`
      return str
    }, '')
  )
  perfHeader = []
  return file
}
