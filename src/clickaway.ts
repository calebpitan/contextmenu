import { Device } from './utility/device'
import { findPath } from './utility/pathfinder'

export interface ClickAwaySwitch {
  flip: () => void
  flap: () => void
}

export function clickAway(src: HTMLElement, handler: () => any, away: Document | Element = document): ClickAwaySwitch {
  const event = Device.isMobile ? 'touchstart' : 'mousedown'
  const listener =  (mouseEvent: Event) => {
    // @ts-ignore
    const path: EventTarget[] = <EventTarget[]> mouseEvent.path ||
      (mouseEvent.composedPath && mouseEvent.composedPath()) || findPath(<EventTarget> mouseEvent.target)
    const style = getComputedStyle(src)
    if (!(path.find((target) => target === src)) && typeof handler === 'function' && (style.display !== 'none' && style.visibility !== 'hidden')) {
      handler()
    }
  }
  return {
    flip: () => away.addEventListener(event, listener, true),
    flap: () => away.removeEventListener(event, listener, true)
  }
}
