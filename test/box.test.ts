import { describe, test, expect } from 'bun:test'

import { degreesToRad } from '../src'

import box, {
  intersects,
  includePoint,
  includeBox,
  intersection,
  clone,
  copy,
  reset,
  transformBox,
  boxCenter
} from '../src/box'
import matrix2D, { rotate, scale, translate } from '../src/matrix2D'
import vector2, { negate } from '../src/vector2'

describe('Box Utilities', () => {
  test('clone should duplicate box', () => {
    const original = box(10, 10, 50, 50)
    const cloned = clone(original)
    expect(cloned).toEqual(original)
  })

  test('copy should replicate properties from one box to another', () => {
    const target = box()
    const source = box(10, 10, 50, 50)
    copy(target, source)
    expect(target).toEqual(source)
  })

  test('reset should zero out box dimensions', () => {
    const target = box(10, 10, 50, 50)
    reset(target)
    expect(target).toEqual(box(0, 0, 0, 0))
  })

  test('includePoint should expand box to include a point', () => {
    const target = box(0, 0, 10, 10)
    const point = { x: 15, y: 5 }
    includePoint(target, point)
    expect(target).toEqual(box(0, 0, 15, 10))
  })

  test('includeBox should expand box to include another box', () => {
    const target = box(0, 0, 10, 10)
    const newBox = box(8, 8, 10, 10)
    includeBox(target, newBox)
    expect(target).toEqual(box(0, 0, 18, 18))
  })

  test('intersects should correctly identify overlapping boxes', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(5, 5, 10, 10)
    expect(intersects(boxA, boxB)).toBeTruthy()
  })

  test('intersection should return correct intersecting box', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(5, 5, 10, 10)
    const result = intersection(boxA, boxB)
    expect(result).toEqual(box(5, 5, 5, 5))
  })

  test('correctly transforms and recalculates bounding box', () => {
    const originalBox = { x: 0, y: 0, width: 10, height: 10 }
    const scaleMatrix = matrix2D(2, 0, 0, 2, 0, 0)
    const transformedBox = transformBox(originalBox, scaleMatrix)
    expect(transformedBox).toEqual({ x: 0, y: 0, width: 20, height: 20 })
  })

  test('rotates a box around its center', () => {
    const originalBox = box(0, 0, 2, 2)
    const radian = Math.PI / 4 // Rotate 45 degrees
    const rotationMatrix = rotate(matrix2D(), matrix2D(), radian)
    const transformed = transformBox(originalBox, rotationMatrix)
    expect(transformed).toEqual({
      x: expect.any(Number),
      y: expect.any(Number),
      width: expect.any(Number),
      height: expect.any(Number)
    })
  })

  test('scales a box', () => {
    const originalBox = box(1, 1, 2, 2)
    const scaleMatrix = scale(matrix2D(), matrix2D(), vector2(2, 3))
    const transformed = transformBox(originalBox, scaleMatrix)
    expect(transformed).toEqual(box(2, 3, 4, 6))
  })

  test('translates a box', () => {
    const originalBox = box(1, 1, 2, 2)
    const translationMatrix = translate(matrix2D(), matrix2D(), { x: 5, y: -2 })
    const transformed = transformBox(originalBox, translationMatrix)
    expect(transformed).toEqual(box(6, -1, 2, 2))
  })

  test('checks intersection between two boxes', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(5, 5, 5, 5) // Overlaps boxA
    expect(intersects(boxA, boxB)).toBeTruthy()
  })

  test('checks intersection between box and point', () => {
    const boxA = box(0, 0, 10, 10)
    const point = vector2(5, 5)
    expect(intersects(boxA, point)).toBeTruthy()
  })

  test('checks non-intersection with padding', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(20, 20, 5, 5)
    expect(intersects(boxA, boxB, 5)).toBeFalsy() // Even with padding, they do not intersect
  })

  test('finds intersection of two boxes', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(5, 5, 10, 10)
    const result = intersection(boxA, boxB)
    expect(result).toEqual(box(5, 5, 5, 5))
  })

  test('boxes touch at edges without intersection', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(10, 0, 10, 10) // Touches boxA's right edge
    expect(intersects(boxA, boxB)).toBeFalsy()
  })

  test('boxes touch at corners without intersection', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(10, 10, 10, 10) // Touches boxA's bottom-right corner
    expect(intersects(boxA, boxB)).toBeFalsy()
  })

  test('intersection with negative dimensions', () => {
    const boxA = box(-5, -5, 10, 10)
    const boxB = box(0, 0, 10, 10)
    expect(intersects(boxA, boxB)).toBeTruthy()
    const result = intersection(boxA, boxB)
    expect(result).toEqual(box(0, 0, 5, 5))
  })

  test('transform box with negative scale', () => {
    const originalBox = box(1, 1, 4, 4)
    const scaleMatrix = scale(matrix2D(), matrix2D(), vector2(-1, -1))
    const transformed = transformBox(originalBox, scaleMatrix)
    expect(transformed).toEqual(box(-5, -5, 4, 4))
  })

  test('no intersection with padding but boxes are too far apart', () => {
    const boxA = box(0, 0, 5, 5)
    const boxB = box(11, 11, 5, 5) // More than 5 units apart
    expect(intersects(boxA, boxB, 5)).toBeFalsy()
  })

  test('checks intersection between box and point', () => {
    const boxA = box(0, 0, 10, 10)
    const point = vector2(5, 5)
    expect(intersects(boxA, point)).toBeTruthy()

    const boxB = box(0, 0, 10, 10)
    const pointB = vector2(-5, 5)
    expect(intersects(boxB, pointB)).toBeFalsy()
  })

  test('checks intersection at boundaries with exact padding', () => {
    const boxA = box(0, 0, 10, 10)
    const boxB = box(15, 15, 5, 5)
    expect(intersects(boxA, boxB, 5)).toBeFalsy()
  })

  test('translates a box', () => {
    const originalBox = box(10, 10, 20, 20)
    const translationMatrix = translate(matrix2D(), matrix2D(), vector2(15, 25))
    const translatedBox = transformBox(originalBox, translationMatrix)
    expect(translatedBox).toEqual(box(25, 35, 20, 20))
  })

  test('scales a box uniformly', () => {
    const originalBox = box(10, 10, 20, 20)
    const scaleMatrix = scale(matrix2D(), matrix2D(), vector2(2, 2))
    const scaledBox = transformBox(originalBox, scaleMatrix)
    expect(scaledBox).toEqual(box(20, 20, 40, 40))
  })

  test('scales a box based on vector2 x', () => {
    const originalBox = box(10, 10, 20, 20)
    const scaleMatrix = scale(matrix2D(), matrix2D(), vector2(2, 1))
    const scaledBox = transformBox(originalBox, scaleMatrix)
    expect(scaledBox).toEqual(box(20, 10, 40, 20))
  })

  test('scales a box based on vector2 y', () => {
    const originalBox = box(10, 10, 20, 20)
    const scaleMatrix = scale(matrix2D(), matrix2D(), vector2(1, 2))
    const scaledBox = transformBox(originalBox, scaleMatrix)
    expect(scaledBox).toEqual(box(10, 20, 20, 40))
  })

  test('scales a box uniformly', () => {
    const originalBox = box(10, 10, 20, 20)
    const scaleMatrix = scale(matrix2D(), matrix2D(), { x: 2, y: 2 })
    const scaledBox = transformBox(originalBox, scaleMatrix)
    expect(scaledBox).toEqual(box(20, 20, 40, 40))
  })

  test('rotates a box 90 degrees', () => {
    const originalBox = box(10, 10, 20, 20)
    const rotationMatrix = rotate(matrix2D(), matrix2D(), Math.PI / 2)
    const rotatedBox = transformBox(originalBox, rotationMatrix)
    expect(rotatedBox.x).toBeCloseTo(-30)
    expect(rotatedBox.y).toBeCloseTo(10)
    expect(rotatedBox.width).toBeCloseTo(20)
    expect(rotatedBox.height).toBeCloseTo(20)
  })

  test('translates a box with matrix2D', () => {
    const originalBox = box(10, 10, 20, 20)
    let matrix = translate(matrix2D(), matrix2D(), vector2(20, 20))

    const transformedBox = transformBox(originalBox, matrix)

    expect(transformedBox.x).toBe(30)
    expect(transformedBox.y).toBe(30)
    expect(transformedBox.width).toBe(20)
    expect(transformedBox.height).toBe(20)
  })

  test('translates and reverses a box with matrix2D', () => {
    const originalBox = box(10, 10, 20, 20)
    let matrix = translate(matrix2D(), matrix2D(), vector2(20, 20))
    translate(matrix, matrix, vector2(-20, -20))

    const transformedBox = transformBox(originalBox, matrix)

    expect(transformedBox.x).toBe(10)
    expect(transformedBox.y).toBe(10)
    expect(transformedBox.width).toBe(20)
    expect(transformedBox.height).toBe(20)
  })

  test('combines translation and rotation', () => {
    const originalBox = box(10, 10, 20, 20)
    const center = boxCenter(originalBox)
    let matrix = translate(matrix2D(), matrix2D(), center)

    matrix = rotate(matrix, matrix, degreesToRad(45))
    translate(matrix, matrix, negate(center, center))

    const transformedBox = transformBox(originalBox, matrix)

    expect(transformedBox.x).toBeCloseTo(5.857)
    expect(transformedBox.y).toBeCloseTo(5.857)
    expect(transformedBox.width).toBeCloseTo(28.284)
    expect(transformedBox.height).toBeCloseTo(28.284)
  })

  test('handles negative scaling', () => {
    const originalBox = box(10, 10, 20, 20)
    const scaleMatrix = scale(matrix2D(), matrix2D(), { x: -1, y: -1 })
    const flippedBox = transformBox(originalBox, scaleMatrix)
    expect(flippedBox).toEqual(box(-30, -30, 20, 20))
  })

  test('applies zero rotation', () => {
    const originalBox = box(10, 10, 20, 20)
    const rotationMatrix = rotate(matrix2D(), matrix2D(), 0)
    const unchangedBox = transformBox(originalBox, rotationMatrix)
    expect(unchangedBox).toEqual(box(10, 10, 20, 20))
  })
})
