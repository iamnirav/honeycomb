import { deleteFn, insertFn, isOnlyEmoji, shortenName } from '@/helpers'

const items = [
  { uuid: 'a', num: 1 },
  { uuid: 'b', num: 2 },
  { uuid: 'c', num: 3 },
]
const newItem = { uuid: 'd', num: 4 }
const newItemDuplicateUuid = { uuid: 'a', num: 5 }
const itemToDelete = { uuid: 'b' }

describe('insertFn', () => {
  it('returns a state updater that appends the provided item', () => {
    const returnedFn = insertFn(newItem)
    const newItems = returnedFn(items)
    expect(newItems.length).toBe(4)
    expect(newItems).toContain(newItem)
  })

  it('returns a state updater that removes any items with the same uuid as the provided item', () => {
    const returnedFn = insertFn(newItemDuplicateUuid)
    const newItems = returnedFn(items)
    expect(newItems.length).toBe(3)
    expect(newItems).not.toContain(items[0])
    expect(newItems).toContain(newItemDuplicateUuid)
  })

  it('returns a state updater that does not modify the original array', () => {
    const returnedFn = insertFn(newItem)
    const itemsCopy = [...items]
    const newItems = returnedFn(items)
    expect(items).not.toBe(newItems)
    expect(items).toEqual(itemsCopy)
  })
})

describe('deleteFn', () => {
  it('returns a state updater that removes any items with the same uuid as the provided item', () => {
    const returnedFn = deleteFn(itemToDelete)
    const newItems = returnedFn(items)
    expect(newItems.length).toBe(2)
    expect(newItems).not.toContain(items[1])
  })

  it('returns a state updater that does not modify the original array', () => {
    const returnedFn = deleteFn(itemToDelete)
    const itemsCopy = [...items]
    const newItems = returnedFn(items)
    expect(items).not.toBe(newItems)
    expect(items).toEqual(itemsCopy)
  })
})

describe('isOnlyEmoji', () => {
  it('identifies a string without emoji', () => {
    expect(isOnlyEmoji('this is a string with no emoji')).toBe(false)
  })

  it('identifies a string with text and emoji', () => {
    expect(isOnlyEmoji('this is a string with 😀 one emoji')).toBe(false)
  })

  it('identifies a string with only one emoji', () => {
    expect(isOnlyEmoji('😀')).toBe(true)
  })

  it('identifies a string with multiple emoji', () => {
    expect(isOnlyEmoji('😀😀😀')).toBe(true)
  })

  it('identifies a string with emoji and spaces', () => {
    expect(isOnlyEmoji('😀 😀 😀')).toBe(false)
  })

  it('identifies a string with a multi-part emoji', () => {
    expect(isOnlyEmoji('🤦🏽‍♂️')).toBe(true)
  })
})

describe('shortenName', () => {
  it('handles the empty string', () => {
    expect(shortenName('')).toBe('')
  })

  it('handles a string whose first word is only emoji', () => {
    expect(shortenName('🤦🏽‍♂️ man facepalming')).toBe('🤦🏽‍♂️')
  })

  it('handles a single word string longer than 4 characters', () => {
    expect(shortenName('noodle')).toBe('n')
  })

  it('handles a single word string shorter than 5 characters', () => {
    expect(shortenName('nood')).toBe('nood')
  })

  it('handles a multi-word string', () => {
    expect(shortenName('noodle van arsdale')).toBe('nva')
  })
})
