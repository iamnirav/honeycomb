import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react'
import db from '@/../db'

export interface MapType {
  id: number
  name: string
  uuid: string
  background: string[][]
}

interface MapContextType {
  map: MapType
  updateBackground: Function
}

export const MapContext = createContext<MapContextType>({
  map: { id: -1, name: '', uuid: '', background: [] },
  updateBackground: () => {},
})

export function MapProvider(props: PropsWithChildren<{ map: MapType }>) {
  // TODO generate types from db
  // https://supabase.com/docs/guides/api/rest/generating-types
  const [map, setMap] = useState<MapType>(props.map)

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
              setMap(data.new as MapType)
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
    async function updateBackground(background: string[][]) {
      if (map) {
        // Update locally
        setMap({ ...map, background })

        // Update on server
        await db
          .from('maps')
          .update({ ...map, background })
          .eq('id', map.id)
      }
    }

    return {
      map,
      updateBackground,
    }
  }, [map])

  return (
    <MapContext.Provider value={memoizedMapContext}>
      {props.children}
    </MapContext.Provider>
  )
}
