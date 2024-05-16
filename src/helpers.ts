import { Coords } from '@/types'

export function insertFn<T extends { uuid: string }>(insertItem: T) {
  return (items: T[]) => {
    return [
      ...items.filter((item) => item.uuid !== insertItem.uuid),
      insertItem,
    ]
  }
}

export function updateFn<T extends { uuid: string }>(updateItem: T) {
  return (items: T[]) => {
    return [
      ...items.filter((item) => item.uuid !== updateItem.uuid),
      updateItem,
    ]
  }
}

export function deleteFn<T extends { uuid: string }>(deleteItem: T) {
  return (items: T[]) => {
    return [...items.filter((item) => item.uuid !== deleteItem.uuid)]
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

export function getColor(code: number | null) {
  return COLORS[code || 0]
}

export const coordsMath = {
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
