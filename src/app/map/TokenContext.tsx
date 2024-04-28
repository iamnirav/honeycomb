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

interface TokenContextType {
  tokens: any
  setTokens: Dispatch<SetStateAction<any | null>>
  createToken: Function
  updateToken: Function
  deleteToken: Function
}

export const TokenContext = createContext<TokenContextType>({
  tokens: {},
  setTokens: (prevState: SetStateAction<any | null>) => prevState,
  createToken: () => {},
  updateToken: () => {},
  deleteToken: () => {},
})

export function TokenProvider({
  children,
  mapUuid,
}: PropsWithChildren<{ mapUuid: string }>) {
  // TODO generate types from db
  // https://supabase.com/docs/guides/api/rest/generating-types
  const [tokens, setTokens] = useState([] as any)
  const [mapId, setMapId] = useState(undefined)

  // Initial load of map and tokens
  useEffect(() => {
    const ac = new AbortController()

    // TODO get initial tokens via server component
    // https://supabase.com/docs/guides/realtime/realtime-with-nextjs
    async function fetchTokens() {
      const { data, error } = await db
        .from('maps')
        .select('id, uuid, name, tokens (id, img_url, name, x, y)')
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
  useEffect(() => {
    // Only subscribe once mapId has been fetched
    if (!mapId) return

    const channel = db.channel('tokens_channel')
    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tokens',
          filter: `map_id=eq.${mapId}`,
        },
        (data) => {
          if (!data.errors) {
            if (data.eventType === 'UPDATE') {
              const newTokens = setTokens((oldTokens: any[]) => {
                return [
                  ...oldTokens.filter(
                    (token: { id: number }) => token.id !== data.new.id,
                  ),
                  data.new,
                ]
              })
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
    async function createToken(newToken: {}) {
      // Update locally
      const newTokens = [...tokens, newToken]
      setTokens(newTokens)

      // Update server
      await db.from('tokens').insert({ ...newToken, map_id: mapId })
    }
    async function updateToken(updatedToken: { id: number }) {
      // Update locally
      const newTokens = [
        ...tokens.filter(
          (token: { id: number }) => token.id !== updatedToken.id,
        ),
        updatedToken,
      ]
      setTokens(newTokens)

      // Update server
      await db.from('tokens').update(updatedToken).eq('id', updatedToken.id)
    }

    function deleteToken() {}
    return { tokens, setTokens, createToken, updateToken, deleteToken }
  }, [tokens, setTokens, mapId])

  return (
    <TokenContext.Provider value={memoizedTokens}>
      {children}
    </TokenContext.Provider>
  )
}
