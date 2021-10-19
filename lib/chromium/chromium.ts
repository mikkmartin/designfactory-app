import { ServerResponse } from 'http'
import core from 'puppeteer-core'
import { getOptions } from './options'
import perf from 'lib/performanceMetrics'
let _page: core.Page | null

async function getPage(isDev: boolean) {
  if (_page) {
    return _page
  }
  const options = await getOptions(isDev)
  const browser = await core.launch(options)
  _page = await browser.newPage()
  await _page.setJavaScriptEnabled(false)
  return _page
}

interface IScreenshot {
  isDev: boolean
  res: ServerResponse
  supersample?: number
  timeout?: number
}

export async function getScreenshot(url, { res, isDev, supersample = 2 }: IScreenshot) {
  
  perf.startTimer('Engine Boot')
  const page = await getPage(isDev)
  perf.endTimer('Engine Boot')

  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: supersample })

  perf.startTimer('Page request')
  await page.goto(url)

  perf.startTimer('Loading page content')
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
  perf.endTimer('Loading page content')

  perf.startTimer('Image capture')
  const file = await element.screenshot({ type: 'png', omitBackground: true })
  perf.endTimer('Image capture')

  perf.setHeader(res)
  return file
}
