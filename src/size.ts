import type { Size } from './api'

export type { Size } from './api'

export const set = (s: Size, width: number, height: number) => {
  s.width = width
  s.height = height
  return s
}

const size = (width: number = 0, height: number = 0): Size => ({
  width,
  height
})

export default size

export const isSize = (v: any): v is Size =>
  v != null && typeof v.width === 'number' && typeof v.height === 'number'
/**
 * Creates a clone of the given box.
 * @param v - The box to clone.
 * @returns A new box with the same properties.
 */
export const clone = (s: Size) => size(s.width, s.height)

/**
 * Copies the properties from one box to another.
 * @param v - The box to modify.
 * @param a - The source box.
 * @returns The modified box `v`.
 */
export const copy = (s: Size, a: Size) => set(s, a.width, a.height)

/**
 * Resets the box dimensions to zero.
 * @param v - The box to reset.
 * @returns The reset box with zero dimensions.
 */
export const reset = (s: Size) => set(s, 0, 0)

export const resize = (v: Size, width: number, height: number) => set(v, width, height)
