import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react'
import db from '@/db'
import { Map } from '@/types'

interface MapContextType {
  map: Map
  updateTiles: Function
}

export const MapContext = createContext<MapContextType>({
  map: { id: 0, name: '', uuid: '', tiles: [] },
  updateTiles: () => {},
})

export function MapProvider(props: PropsWithChildren<{ map: Map }>) {
  const [map, setMap] = useState<Map>(props.map)

  // Subscribe to map updates
  // TODO change to using supabase broadcast for live updates to ease load on db
  useEffect(() => {
    // Only subscribe once map has been fetched
    if (!map) return

    const channel = db.channel('maps-channel')
    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'maps',
          filter: `mapId=eq.${map.id}`,
        },
        (data) => {
          if (!data.errors) {
            if (data.eventType === 'UPDATE' && data.new.id) {
              setMap(data.new as Map)
            }
          }
        },
      )
      .subscribe()

    return () => {
      db.removeChannel(channel)
    }
  }, [map])

  // Memoize context functions object for the rest of the app to use
  const memoizedMapContext: MapContextType = useMemo(() => {
    async function updateTiles(tiles: string[][]) {
      if (map) {
        // Update locally
        setMap({ ...map, tiles })

        // Update on server
        await db
          .from('maps')
          .update({ ...map, tiles })
          .eq('id', map.id)
      }
    }

    return {
      map,
      updateTiles,
    }
  }, [map])

  return (
    <MapContext.Provider value={memoizedMapContext}>
      {props.children}
    </MapContext.Provider>
  )
}
