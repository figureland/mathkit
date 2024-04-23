import type { Easing } from './api'
import { PI } from './constants'
import { cos, pow, sin, sqrt } from '@figureland/mathkit'

export type { Easing } from './api'

export const linear: Easing = (x: number) => x

export const easeInQuad: Easing = (x: number) => x * x

export const easeOutQuad: Easing = (x: number) => 1 - (1 - x) * (1 - x)

export const easeInOutQuad: Easing = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2

export const easeInCubic: Easing = (x: number) => x * x * x

export const easeOutCubic: Easing = (x: number) => 1 - pow(1 - x, 3)

export const easeInOutCubic: Easing = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2

export const easeInQuart: Easing = (x: number) => x * x * x * x

export const easeOutQuart: Easing = (x: number) => 1 - pow(1 - x, 4)

export const easeInOutQuart: Easing = (x: number) =>
  x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2

export const easeInQuint: Easing = (x: number) => x * x * x * x * x

export const easeOutQuint: Easing = (x: number) => 1 - pow(1 - x, 5)

export const easeInOutQuint: Easing = (x: number) =>
  x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2

export const easeInSine: Easing = (x: number) => 1 - cos((x * PI) / 2)

export const easeOutSine: Easing = (x: number) => sin((x * PI) / 2)

export const easeInOutSine: Easing = (x: number) => -(cos(PI * x) - 1) / 2

export const easeInExpo: Easing = (x: number) => (x === 0 ? 0 : pow(2, 10 * x - 10))

export const easeOutExpo: Easing = (x: number) => (x === 1 ? 1 : 1 - pow(2, -10 * x))

export const easeInOutExpo: Easing = (x: number) =>
  x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2

export const easeInCirc: Easing = (x: number) => 1 - sqrt(1 - pow(x, 2))

export const easeOutCirc: Easing = (x: number) => sqrt(1 - pow(x - 1, 2))

export const easeInOutCirc: Easing = (x: number) =>
  x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2

export const easeInBack: Easing = (x: number) => 2.70158 * x * x * x - 1.70158 * x * x

export const easeOutBack: Easing = (x: number) =>
  1 + 2.70158 * pow(x - 1, 3) + 1.70158 * pow(x - 1, 2)

export const easeInOutBack: Easing = (x: number) =>
  x < 0.5
    ? (pow(2 * x, 2) * ((2.5949095 + 1) * 2 * x - 2.5949095)) / 2
    : (pow(2 * x - 2, 2) * ((2.5949095 + 1) * (x * 2 - 2) + 2.5949095) + 2) / 2

export const easeInElastic: Easing = (x: number) =>
  x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin(((x * 10 - 10.75) * (2 * PI)) / 3)

export const easeOutElastic: Easing = (x: number) =>
  x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin(((x * 10 - 0.75) * (2 * PI)) / 3) + 1

export const easeInOutElastic: Easing = (x: number) =>
  x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? -(pow(2, 20 * x - 10) * sin(((20 * x - 11.125) * (2 * PI)) / 4.5)) / 2
        : (pow(2, -20 * x + 10) * sin(((20 * x - 11.125) * (2 * PI)) / 4.5)) / 2 + 1

export const easeInBounce: Easing = (x: number) => 1 - easeOutBounce(1 - x)

export const easeOutBounce: Easing = (x: number) => {
  const n1 = 7.5625
  const d1 = 2.75
  if (x < 1 / d1) {
    return n1 * x * x
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375
  }
}

export const easeInOutBounce: Easing = (x: number) =>
  x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2

export const easeInPoly =
  (n: number): Easing =>
  (x: number) =>
    pow(x, n)

export const easeOutPoly =
  (n: number): Easing =>
  (x: number) =>
    1 - pow(1 - x, n)

export const easeInOutPoly =
  (n: number): Easing =>
  (x: number) =>
    x < 0.5 ? pow(x * 2, n) / 2 : (2 - pow(2 * (1 - x), n)) / 2

export const easeInSin: Easing = (x: number) => 1 - cos((x * PI) / 2)

export const easeOutSin: Easing = (x: number) => sin((x * PI) / 2)

export const easeInOutSin: Easing = (x: number) => -(cos(PI * x) - 1) / 2

export const easeInExp: Easing = (x: number) => (x === 0 ? 0 : pow(2, 10 * x - 10))

export const easeOutExp: Easing = (x: number) => (x === 1 ? 1 : 1 - pow(2, -10 * x))

export const easeInOutExp: Easing = (x: number) =>
  x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2

export const easeInCirc2: Easing = (x: number) => 1 - sqrt(1 - x * x)

export const easeOutCirc2: Easing = (x: number) => sqrt(1 - (1 - x) * (1 - x))

export const easeInOutCirc2: Easing = (x: number) =>
  x < 0.5 ? (1 - sqrt(1 - x * x)) / 2 : (sqrt(1 - (1 - x) * (1 - x)) + 1) / 2

export const easeInBack2: Easing = (x: number) => 2.70158 * x * x * x - 1.70158 * x * x

export const easeOutBack2: Easing = (x: number) =>
  1 + 2.70158 * pow(x - 1, 3) + 1.70158 * pow(x - 1, 2)

export const easeInOutBack2: Easing = (x: number) =>
  x < 0.5
    ? (pow(2 * x, 2) * ((2.5949095 + 1) * 2 * x - 2.5949095)) / 2
    : (pow(2 * x - 2, 2) * ((2.5949095 + 1) * (x * 2 - 2) + 2.5949095) + 2) / 2

export const easeInElastic2: Easing = (x: number) =>
  x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin(((x * 10 - 10.75) * (2 * PI)) / 3)

export const easeOutElastic2: Easing = (x: number) =>
  x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin(((x * 10 - 0.75) * (2 * PI)) / 3) + 1

export const easeInOutElastic2: Easing = (x: number) =>
  x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? -(pow(2, 20 * x - 10) * sin(((20 * x - 11.125) * (2 * PI)) / 4.5)) / 2
        : (pow(2, -20 * x + 10) * sin(((20 * x - 11.125) * (2 * PI)) / 4.5)) / 2 + 1

export const easeInBounce2: Easing = (x: number) => 1 - easeOutBounce(1 - x)
