export interface ClickAwaySwitch {
  flip: () => void
  flap: () => void
}
export function clickAway(src: HTMLElement, handler: () => any, away: Document | Element = document): ClickAwaySwitch {
  const event = 'click'
  const listener =  (mouseEvent: Event) => {
    const path = mouseEvent.composedPath()
    if (!(path.find((target) => target === src))) {
      handler()
    }
  }
  return {
    flip: () => away.addEventListener(event, listener),
    flap: () => away.removeEventListener(event, listener)
  }
}
