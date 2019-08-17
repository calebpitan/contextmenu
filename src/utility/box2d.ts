export default class Box2D {
  x1: number
  y1: number
  x2: number
  y2: number
  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.x2 = x2
    this.y1 = y1
    this.y2 = y2
  }

  get width(): number {
    return this.x2 - this.x1
  }

  get height(): number {
    return this.y2 - this.y1
  }
}
