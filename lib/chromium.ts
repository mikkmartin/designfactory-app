import core from 'puppeteer-core'
import { getOptions } from './options'
import type { FileType } from './types'
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

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
  const page = await getPage(isDev)
  await page.setViewport({ width: 2048, height: 1170, deviceScaleFactor: 2 })

  await page.setContent(html)
  //await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 })

  const selector = '#__next > div > div:nth-child(2)'
  await page.waitForSelector(selector)
  const element = await page.$(selector)

  await page.evaluate(async () => {
    /*
    const selector = '#__next > div > div'
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
    */
  })

  const file = await element.screenshot({ type })
  return file
}
