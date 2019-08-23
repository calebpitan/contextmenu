const browsers = {
  pixel2: {
    base: 'BrowserStack',
    device: 'Google Pixel 2',
    os: 'android',
    os_version: '8.0',
    real_mobile: true
  },
  chromeWin10: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '10',
    browser: 'Chrome',
    browser_version: 'latest'
  },
  firefoxWin10: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '10',
    browser: 'Firefox',
    browser_version: 'latest'
  },
  edgeWin10: {
    base: 'BrowserStack',
    os: 'Windows',
    os_version: '10',
    browser: 'edge',
    browser_version: 'latest'
  },
  chromeMac: {
    base: 'BrowserStack',
    os: 'OS X',
    os_version: 'High Sierra',
    browser: 'Chrome',
    browser_version: 'latest'
  },
  firefoxMac: {
    base: 'BrowserStack',
    os: 'OS X',
    os_version: 'High Sierra',
    browser: 'Firefox',
    browser_version: 'latest'
  },
  safari: {
    base: 'BrowserStack',
    os: 'OS X',
    os_version: 'High Sierra',
    browser: 'Safari',
    browser_version: 'latest'
  }
}

module.exports = {
  browsers,
  browsersKeys: Object.keys(browsers)
}
