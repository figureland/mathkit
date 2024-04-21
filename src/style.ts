/// <reference lib="dom" />

import type { Box, Matrix2D, Vector2 } from './api'

export const transform = (matrix: Matrix2D) =>
  `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[2]}, ${matrix[3]}, ${matrix[4]}, ${matrix[5]})`

export const scale = (s: number) => transform([s, 0, 0, s, 0, 0])

export const translate = (v: Vector2) => transform([1, 0, 0, 1, v.x, v.y])

export const boxFromElement = (element: HTMLElement): Box => {
  const { top: y, left: x, width, height } = element.getBoundingClientRect()
  return { x, y, width, height }
}
