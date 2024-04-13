import {
  ceil as _ceil,
  floor as _floor,
  min as _min,
  max as _max,
  round as _round,
  lerp as _lerp,
  sqrt,
  abs,
  acos,
  sin,
  cos
} from './number'
import type { Matrix2D, Vector2 } from './api'

export type { Vector2 } from './api'

export const EPS = 0.000001

export const set = (v: Vector2, x: number, y: number) => {
  v[0] = x
  v[1] = y
  return v
}

const vector2 = (x: number = 0, y: number = 0): Vector2 => [x, y]

export default vector2

export const clone = (v: Vector2) => vector2(v[0], v[1])

export const copy = (v: Vector2, a: Vector2) => set(v, a[0], a[1])

export const reset = (v: Vector2) => set(v, 0, 0)

export const add = (v: Vector2, a: Vector2, b: Vector2) => set(v, a[0] + b[0], a[1] + b[1])

export const subtract = (v: Vector2, a: Vector2, b: Vector2) => set(v, a[0] - b[0], a[1] - b[1])

export const multiply = (v: Vector2, a: Vector2, b: Vector2) => set(v, a[0] * b[0], a[1] * b[1])

export const divide = (v: Vector2, a: Vector2, b: Vector2) => set(v, a[0] / b[0], a[1] / b[1])

export const ceil = (v: Vector2, a: Vector2) => set(v, _ceil(a[0]), _ceil(a[1]))

export const floor = (v: Vector2, a: Vector2) => set(v, _floor(a[0]), _floor(a[1]))

export const min = (v: Vector2, a: Vector2, b: Vector2) =>
  set(v, _min(a[0], b[0]), _min(a[1], b[1]))

export const max = (v: Vector2, a: Vector2, b: Vector2) =>
  set(v, _max(a[0], b[0]), _max(a[1], b[1]))

export const round = (v: Vector2, a: Vector2) => set(v, _round(a[0]), _round(a[1]))

export const scale = (v: Vector2, a: Vector2, b: number) => set(v, a[0] * b, a[1] * b)

export const scaleAndAdd = (v: Vector2, a: Vector2, b: Vector2, scale: number) =>
  set(v, a[0] + b[0] * scale, a[1] + b[1] * scale)

export const distance = (a: Vector2, b: Vector2) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return sqrt(x * x + y * y)
}

export const squaredDistance = (a: Vector2, b: Vector2) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return x * x + y * y
}

export const length = (a: Vector2) => sqrt(a[0] * a[0] + a[1] * a[1])

export const squaredLength = (a: Vector2) => a[0] * a[0] + a[1] * a[1]

export const negate = (v: Vector2, a: Vector2) => set(v, -a[0], -a[1])

export const inverse = (v: Vector2, a: Vector2) => set(v, 1.0 / a[0], 1.0 / a[1])

export const normalize = (v: Vector2, a: Vector2) => {
  let len = a[0] * a[0] + a[1] * a[1]
  if (len > 0) {
    len = 1 / sqrt(len)
  }

  return set(v, a[0] * len, a[1] * len)
}

export const dot = (a: Vector2, b: Vector2) => a[0] * b[0] + a[1] * b[1]

export const lerp = (v: Vector2, a: Vector2, b: Vector2, amount: number) =>
  set(v, _lerp(a[0], b[0], amount), _lerp(a[1], b[1], amount))

export const transformMatrix2D = (v: Vector2, a: Vector2, m: Matrix2D) =>
  set(v, m[0] * a[0] + m[2] * a[1] + m[4], m[1] * a[0] + m[3] * a[1] + m[5])

export const rotate = (v: Vector2, a: Vector2, b: Vector2, rad: number) => {
  const p0 = a[0] - b[0]
  const p1 = a[1] - b[1]
  const s = sin(rad)
  const c = cos(rad)
  return set(v, p0 * c - p1 * s + b[0], p0 * s + p1 * c + b[1])
}

export const angle = (a: Vector2, b: Vector2) => {
  const m = sqrt((a[0] * a[0] + a[1] * a[1]) * (b[0] * b[0] + b[1] * b[1]))
  const c = m && (a[0] * b[0] + a[1] * b[1]) / m
  return acos(_min(_max(c, -1), 1))
}

export const exactEquals = (a: Vector2, b: Vector2) => a[0] === b[0] && a[1] === b[1]

export const equals = (a: Vector2, b: Vector2) =>
  abs(a[0] - b[0]) <= EPS * _max(1.0, abs(a[0]), abs(b[0])) &&
  abs(a[1] - b[1]) <= EPS * _max(1.0, abs(a[1]), abs(b[1]))
