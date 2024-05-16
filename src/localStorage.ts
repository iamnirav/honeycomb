import { Map } from '@/types'

const STORAGE_KEY_MAPS = 'recent-maps'

function upsertMap({ name, uuid }: Map) {
  if (typeof window === 'undefined') return
  const recentMapsString = window.localStorage.getItem(STORAGE_KEY_MAPS)
  const recentMaps: Map[] = recentMapsString ? JSON.parse(recentMapsString) : []
  const updatedMaps = [
    { name, uuid },
    ...recentMaps.filter((recentMap) => recentMap.uuid !== uuid),
  ]
  window.localStorage.setItem(STORAGE_KEY_MAPS, JSON.stringify(updatedMaps))
}

function getMaps() {
  if (typeof window === 'undefined') return []
  const recentMapsString = window.localStorage.getItem(STORAGE_KEY_MAPS)
  return recentMapsString ? JSON.parse(recentMapsString) : []
}

function removeMap(uuid: string) {
  if (typeof window === 'undefined') return
  const recentMapsString = window.localStorage.getItem(STORAGE_KEY_MAPS)
  const recentMaps: Map[] = recentMapsString ? JSON.parse(recentMapsString) : []
  const updatedMaps = [
    ...recentMaps.filter((recentMap) => recentMap.uuid !== uuid),
  ]
  window.localStorage.setItem(STORAGE_KEY_MAPS, JSON.stringify(updatedMaps))
}

const localStorage = {
  upsertMap,
  getMaps,
  removeMap,
}

export default localStorage
