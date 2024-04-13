import { Matrix2D, Vector2 } from './api'

export const transform = (matrix: Matrix2D) =>
  `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[2]}, ${matrix[3]}, ${matrix[4]}, ${matrix[5]})`

export const scale = (s: number) => transform([s, 0, 0, s, 0, 0])

export const translate = ([x, y]: Vector2) => transform([1, 0, 0, 1, x, y])
