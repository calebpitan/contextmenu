export const Device = {
  isMobile: false,
  isDesktop: false
}
Object.defineProperty(Device, 'isMobile', {
  get: () => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i
    if (navigator.userAgent.match(mobile)) {
      return true
    }
    return false
  },
  enumerable: true,
  configurable: true
})
Object.defineProperty(Device, 'isDesktop', {
  get: () => !Device.isMobile,
  enumerable: true,
  configurable: true
})
