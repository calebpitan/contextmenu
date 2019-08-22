export function find(target: EventTarget, item: HTMLElement): HTMLElement | Element | null {
  const Target = <HTMLElement> target
  if (Target.parentNode === null && Target !== item) return null
  return Target === item ? item : find(<EventTarget>Target.parentNode, item)
}

export function findPath(target: EventTarget, path: EventTarget[] = [target]): EventTarget[] | EventTarget {
  const Target = <HTMLElement> target
  if (Target.parentNode !== null) path.push(Target.parentNode)
  return Target.parentNode !== null ? findPath(<EventTarget> Target.parentNode, path) : path
}
