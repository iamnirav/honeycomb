import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import db from '@/../db'
import { deleteFn, insertFn, updateFn } from '@/../helpers'

interface NewTokenType {
  name: string
  ring: number | null
  x: number | null
  y: number | null
  imgUrl: string
}

interface TokenContextType {
  tokens: any
  insertToken: Function
  updateToken: Function
  deleteToken: Function
  newToken: NewTokenType
  setNewTokenCoords: Function
}

export const TokenContext = createContext<TokenContextType>({
  tokens: {},
  insertToken: () => {},
  updateToken: () => {},
  deleteToken: () => {},
  newToken: { x: null, y: null, name: '', ring: null, imgUrl: '' },
  setNewTokenCoords: () => {},
})

export function TokenProvider({
  children,
  mapUuid,
}: PropsWithChildren<{ mapUuid: string }>) {
  // TODO generate types from db
  // https://supabase.com/docs/guides/api/rest/generating-types
  const [tokens, setTokens] = useState([] as any)
  const [mapId, setMapId] = useState(undefined)
  const [newToken, setNewToken] = useState<NewTokenType>({
    x: null,
    y: null,
    name: '',
    ring: null,
    imgUrl: '',
  })

  // Initial load of map and tokens
  useEffect(() => {
    const ac = new AbortController()

    // TODO get initial tokens via server component
    // https://supabase.com/docs/guides/realtime/realtime-with-nextjs
    async function fetchTokens() {
      const { data, error } = await db
        .from('maps')
        .select('id, uuid, name, tokens (id, imgUrl, name, x, y, ring)')
        .filter('uuid', 'eq', mapUuid)
        .limit(1)
        .abortSignal(ac.signal)

      if (!error && data.length) {
        const map = data[0]
        document.title = `${map.name} · Honeycomb`
        setMapId(map.id)
        setTokens(map.tokens)
      }
    }

    fetchTokens()

    return () => {
      ac.abort()
    }
  }, [mapUuid])

  // Subscribe to token updates
  // TODO change to using supabase broadcast for live updates to ease load on db
  useEffect(() => {
    // Only subscribe once mapId has been fetched
    if (!mapId) return

    const channel = db.channel('tokens-channel')
    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tokens',
          filter: `mapId=eq.${mapId}`,
        },
        (data) => {
          if (!data.errors) {
            if (data.eventType === 'INSERT') {
              setTokens(insertFn(data.new))
            } else if (data.eventType === 'UPDATE' && data.new.id) {
              setTokens(updateFn(data.new as { id: number }))
            } else if (data.eventType === 'DELETE' && data.old.id) {
              setTokens(deleteFn(data.old as { id: number }))
            }
          }
        },
      )
      .subscribe()

    return () => {
      db.removeChannel(channel)
    }
  }, [mapId])

  // Memoize context functions object for the rest of the app to use
  const memoizedTokens = useMemo(() => {
    // TODO would this result in temporary duplicates?
    // The version coming back from the server isn't de-duped with the locally created version
    async function insertToken(token: {}) {
      // Create locally
      setTokens(insertFn(token))

      // Create on server
      await db.from('tokens').insert({ ...token, mapId })
    }
    async function updateToken(token: { id: number }) {
      // Update locally
      setTokens(updateFn(token))

      // Update on server
      await db.from('tokens').update(token).eq('id', token.id)
    }

    async function deleteToken(token: { id: number }) {
      // Delete locally
      setTokens(deleteFn(token))

      // Delete on server
      await db.from('tokens').delete().eq('id', token.id)
    }

    function setNewTokenCoords(x: number, y: number) {
      setNewToken({ ...newToken, x, y })
    }

    return {
      tokens,
      insertToken,
      updateToken,
      deleteToken,
      newToken,
      setNewTokenCoords,
    }
  }, [tokens, setTokens, newToken, setNewToken, mapId])

  return (
    <TokenContext.Provider value={memoizedTokens}>
      {children}
    </TokenContext.Provider>
  )
}
