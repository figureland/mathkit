import { floor } from './number'

type Random = () => number

const { random } = Math

export const randomInt = (min: number, max: number, r: Random = random) =>
  floor(r() * (max - min + 1)) + min

export const randomFloat = (min: number, max: number, r: Random = random) => r() * (max - min) + min

export const randomBool = (r: Random = random) => r() >= 0.5

export const randomSign = (r: Random = random) => (r() >= 0.5 ? 1 : -1)

export const randomElement = <T>(arr: T[], r: Random = random): T =>
  arr[randomInt(0, arr.length - 1)]

export const randomize = <T>(arr: T[], r: Random = random): T[] => arr.sort(() => r() - 0.5)

export const randomizeInPlace = <T>(arr: T[], r: Random = random) => arr.sort(() => r() - 0.5)
