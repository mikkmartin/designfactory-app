import core from 'puppeteer-core'
import { getOptions } from './options'
const { performance } = require('perf_hooks')
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
  supersample?: number
  timeout?: number
}

export async function getScreenshot(url, { isDev, supersample = 1 }: Options) {
  const t0 = performance.now()
  const page = await getPage(isDev)
  const t1 = performance.now()
  console.log(`getPage() took ${Math.round(t1 - t0)}ms.`)

  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: supersample })
  const t2 = performance.now()
  console.log(`page.setViewport() took ${Math.round(t2 - t1)}ms.`)

  await page.goto(url)
  const t3 = performance.now()
  console.log(`page.goto() took ${Math.round(t3 - t2)}ms.`)

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
  const t4 = performance.now()
  console.log(`Loading images took ${Math.round(t4 - t3)}ms.`)

  const file = await element.screenshot({ type: 'png', omitBackground: true })
  const t5 = performance.now()
  console.log(`Taking the screenshot took ${Math.round(t5 - t4)}ms.`)
  console.log('------------------------')
  console.log(`Total of ${Math.round((t5 - t0) / 1000)}s (${Math.round(t5 - t0)}ms).`)
  return file
}
