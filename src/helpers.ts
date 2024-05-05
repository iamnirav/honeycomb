// TODO parameterize types

export function insertFn(insertItem: any) {
  return (items: any[]) => {
    return [...items.filter((item: { id: number }) => item.id), insertItem]
  }
}

export function updateFn(updateItem: { id: number }) {
  return (items: any[]) => {
    return [
      ...items.filter((item: { id: number }) => item.id !== updateItem.id),
      updateItem,
    ]
  }
}

export function deleteFn(deleteItem: { id: number }) {
  return (items: any[]) => {
    return [
      ...items.filter((item: { id: number }) => item.id !== deleteItem.id),
    ]
  }
}

export function isOnlyEmoji(str: string) {
  return /^(\p{Emoji}|\u200B|\u200C|\u200D|\uFEFF|\uFE0F|\uFE0E)+$/gu.test(str)
}

export function shortenName(str: string) {
  const words = str.split(' ')
  if (!words.length) return ''
  if (isOnlyEmoji(words[0])) return words[0]
  if (words.length === 1 && words[0].length <= 4) return words[0]
  return words.reduce((acc, word) => {
    return acc + word[0]
  }, '')
}

interface NextUiColors {
  [key: number]:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
}

export const COLORS: NextUiColors = {
  0: 'default',
  1: 'primary',
  2: 'secondary',
  3: 'success',
  4: 'warning',
  5: 'danger',
}

export const COLOR_CODES: number[] = [0, 1, 2, 3, 4, 5]

export function getColor(code: number = 0) {
  return COLORS[code]
}

interface Coords {
  x: number
  y: number
}

export const coordsMath = {
  add(a: Coords, b: Coords) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    }
  },
  subtract(a: Coords, b: Coords) {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    }
  },
  isEqual(a: Coords, b: Coords) {
    return a.x === b.x && a.y === b.y
  },
}

export const ADJACENT_VECTORS = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: 2, y: 0 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: -2, y: 0 },
]

export function hexAdjacent(a: Coords, b: Coords) {
  const vec = coordsMath.subtract(a, b)
  return ADJACENT_VECTORS.some((VECTOR) => {
    return coordsMath.isEqual(vec, VECTOR)
  })
}
