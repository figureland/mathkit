/// <reference lib="dom" />

import { Box, Matrix2D, Vector2 } from './api'
import box from './box'
import matrix2D from './matrix2D'

export const transform = (matrix: Matrix2D) =>
  `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[2]}, ${matrix[3]}, ${matrix[4]}, ${matrix[5]})`

export const scale = (s: number) => transform(matrix2D(s, 0, 0, s, 0, 0))

export const translate = (v: Vector2) => transform(matrix2D(1, 0, 0, 1, v.x, v.y))

export const boxFromElement = (element: HTMLElement): Box => {
  const { top: y, left: x, width, height } = element.getBoundingClientRect()
  return box(x, y, width, height)
}
