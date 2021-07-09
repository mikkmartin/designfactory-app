import core from 'puppeteer-core'
import { getOptions } from './options'
import type { FileType } from './types'
import sharp from 'sharp'
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

type Options = {
  isDev: boolean
  superSample?: number
}

export async function getScreenshot(url, { isDev, superSample = 4 }: Options) {
  const page = await getPage(isDev)
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 * superSample })
  await page.goto(url, { waitUntil: 'networkidle0' })

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

  const file = await element.screenshot({ type: 'png', omitBackground: true })
  if (superSample !== 1) {
    return sharp(file as Buffer)
      .resize(1600)
      .toBuffer()
  } else {
    return file
  }
}
