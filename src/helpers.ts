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
