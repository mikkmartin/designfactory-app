import core from 'puppeteer-core'
import { getOptions } from './options'
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

export async function getScreenshot(url, { isDev, supersample = 1, timeout = 30000 }: Options) {
  const t0 = performance.now()
  const page = await getPage(isDev)
  const t1 = performance.now()
  console.log(`getPage() took ${t1 - t0}ms.`)
  
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 * supersample })
  const t2 = performance.now()
  console.log(`page.setViewport() took ${t1 - t2}ms.`)

  await page.goto(url, { waitUntil: 'networkidle0', timeout })
  const t3 = performance.now()
  console.log(`page.goto() took ${t2 - t3}ms.`)

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
  console.log(`Loading images took ${t3 - t4}ms.`)

  const file = await element.screenshot({ type: 'png', omitBackground: true })
  const t5 = performance.now()
  console.log(`Taking the screenshot took ${t4 - t5}ms.`)
  return file
}
