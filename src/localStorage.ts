import { Map } from '@/../helpers'

const STORAGE_KEY_MAPS = 'recent-maps'

export function updateMapsLocalStorage({ name, uuid }: Map) {
  if (typeof window === 'undefined') return
  const recentMapsString = window.localStorage.getItem(STORAGE_KEY_MAPS)
  const recentMaps: Map[] = recentMapsString ? JSON.parse(recentMapsString) : []
  const updatedMaps = [
    { name, uuid },
    ...recentMaps.filter((recentMap) => recentMap.uuid !== uuid),
  ]
  window.localStorage.setItem(STORAGE_KEY_MAPS, JSON.stringify(updatedMaps))
}

export function getMapsFromLocalStorage() {
  if (typeof window === 'undefined') return []
  const recentMapsString = window.localStorage.getItem(STORAGE_KEY_MAPS)
  return recentMapsString ? JSON.parse(recentMapsString) : []
}

export function removeMapFromLocalStorage(uuid: string) {
  if (typeof window === 'undefined') return
  const recentMapsString = window.localStorage.getItem(STORAGE_KEY_MAPS)
  const recentMaps: Map[] = recentMapsString ? JSON.parse(recentMapsString) : []
  const updatedMaps = [
    ...recentMaps.filter((recentMap) => recentMap.uuid !== uuid),
  ]
  window.localStorage.setItem(STORAGE_KEY_MAPS, JSON.stringify(updatedMaps))
}
