import type { Matrix2D, Vector2 } from './api'
import { EPS } from './constants'
import { sin, cos, sqrt, abs, max, isNumber } from './number'

export type { Matrix2D } from './api'

const matrix2D = (
  a: number = 1,
  b: number = 0,
  c: number = 0,
  d: number = 1,
  e: number = 0,
  f: number = 0
): Matrix2D => [a, b, c, d, e, f]

export default matrix2D

export const clone = (m: Matrix2D) => matrix2D(m[0], m[1], m[2], m[3], m[4], m[5])

const set = (m: Matrix2D, a: number, b: number, c: number, d: number, e: number, f: number) => {
  m[0] = a
  m[1] = b
  m[2] = c
  m[3] = d
  m[4] = e
  m[5] = f
  return m
}

export const isMatrix2D = (m: any): m is Matrix2D =>
  m != null && m.length === 6 && m.every(isNumber)

export const identity = (m: Matrix2D) => set(m, 1, 0, 0, 1, 0, 0)

/**
 * Copy the values from one {@link Matrix2D} to another
 */
export const copy = (m: Matrix2D, a: Matrix2D) => set(m, a[0], a[1], a[2], a[3], a[4], a[5])

/**
 * Inverts a {@link Matrix2D}
 */

export const invert = (m: Matrix2D, a: Matrix2D) => {
  let det = determinant(a)
  det = 1.0 / det

  return set(
    m,
    a[3] * det,
    -a[1] * det,
    -a[2] * det,
    a[0] * det,
    (a[2] * a[5] - a[3] * a[4]) * det,
    (a[1] * a[4] - a[0] * a[5]) * det
  )
}

/**
 * Calculates the determinant of a {@link Matrix2D}
 */
export const determinant = (m: Matrix2D) => m[0] * m[3] - m[1] * m[2]

/**
 * Multiplies two {@link Matrix2D}s
 */
export const multiply = (m: Matrix2D, a: Matrix2D, b: Matrix2D) =>
  set(
    m,
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5]
  )

/**
 * Rotates a {@link Matrix2D} by the given angle
 */
export const rotate = (m: Matrix2D, a: Matrix2D, rad: number) => {
  const s = sin(rad)
  const c = cos(rad)
  return set(
    m,
    a[0] * c + a[2] * s,
    a[1] * c + a[3] * s,
    a[0] * -s + a[2] * c,
    a[1] * -s + a[3] * c,
    a[4],
    a[5]
  )
}

export const scale = (m: Matrix2D, a: Matrix2D, v: Vector2) =>
  set(m, a[0] * v.x, a[1] * v.x, a[2] * v.y, a[3] * v.y, a[4], a[5])

export const getScale = (m: Matrix2D) => sqrt(m[0] * m[3])

export const translate = (m: Matrix2D, a: Matrix2D, v: Vector2) =>
  set(m, a[0], a[1], a[2], a[3], a[0] * v.x + a[2] * v.y + a[4], a[1] * v.x + a[3] * v.y + a[5])

export const fromRotation = (m: Matrix2D, rad: number) => {
  const s = sin(rad)
  const c = cos(rad)

  return set(m, c, s, -s, c, 0, 0)
}
export const fromScaling = (m: Matrix2D, v: Vector2) => set(m, v.x, 0, 0, v.y, 0, 0)

export const fromTranslation = (m: Matrix2D, v: Vector2) => set(m, 1, 0, 0, 1, v.x, v.y)

export const add = (m: Matrix2D, a: Matrix2D, b: Matrix2D) =>
  set(m, a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3], a[4] + b[4], a[5] + b[5])

export const subtract = (m: Matrix2D, a: Matrix2D, b: Matrix2D) =>
  set(m, a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3], a[4] - b[4], a[5] - b[5])

export const multiplyScalar = (m: Matrix2D, a: Matrix2D, b: number) =>
  set(m, a[0] * b, a[1] * b, a[2] * b, a[3] * b, a[4] * b, a[5] * b)

export const equals = (m: Matrix2D, a: Matrix2D) =>
  abs(m[0] - a[0]) <= EPS * max(1.0, abs(m[0]), abs(a[0])) &&
  abs(m[1] - a[1]) <= EPS * max(1.0, abs(m[1]), abs(a[1])) &&
  abs(m[2] - a[2]) <= EPS * max(1.0, abs(m[2]), abs(a[2])) &&
  abs(m[3] - a[3]) <= EPS * max(1.0, abs(m[3]), abs(a[3])) &&
  abs(m[4] - a[4]) <= EPS * max(1.0, abs(m[4]), abs(a[4])) &&
  abs(m[5] - a[5]) <= EPS * max(1.0, abs(m[5]), abs(a[5]))
