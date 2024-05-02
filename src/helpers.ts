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
