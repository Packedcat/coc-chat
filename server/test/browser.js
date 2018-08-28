const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    }
  })

  console.log('Dimensions:', dimensions)
  await page.evaluate(() => {
    document.querySelector('#m').value = 'what the fuck'
    document.querySelector('button').click()
  })
})()
