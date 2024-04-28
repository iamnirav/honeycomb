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
  setToken: Function
}

export const TokenContext = createContext<TokenContextType>({
  tokens: {},
  setTokens: (prevState: SetStateAction<any | null>) => prevState,
  setToken: () => {},
})

export function TokenProvider({
  children,
  mapId,
}: PropsWithChildren<{ mapId: string }>) {
  // TODO generate types from db
  // https://supabase.com/docs/guides/api/rest/generating-types
  const [tokens, setTokens] = useState([] as any)

  useEffect(() => {
    const ac = new AbortController()

    async function fetchTokens() {
      const { data, error } = await db
        .from('maps')
        .select('id, uuid, name, tokens (id, img_url, name, x, y)')
        .filter('uuid', 'eq', mapId)
        .limit(1)
        .abortSignal(ac.signal)

      if (!error && data.length) {
        const map = data[0]
        console.log(map.name)
        setTokens(map.tokens)
      }
    }

    fetchTokens()

    return () => {
      ac.abort()
    }
  }, [mapId])

  useEffect(() => {
    const channel = db.channel('tokens_channel')
    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tokens' },
        (data) => {
          if (!data.errors) {
            if (data.eventType === 'UPDATE') {
              const newTokens = [
                ...tokens.filter((token) => token.id !== data.new.id),
                data.new,
              ]
              setTokens(newTokens)
            }
          }
        },
      )
      .subscribe()

    return () => {
      db.removeChannel(channel)
    }
  }, [tokens])

  const memoizedTokens = useMemo(() => {
    async function setToken(newToken) {
      // Update locally
      const newTokens = [
        ...tokens.filter((token) => token.id !== newToken.id),
        newToken,
      ]
      setTokens(newTokens)

      // Update server
      await db.from('tokens').update(newToken).eq('id', newToken.id)
    }
    return { tokens, setTokens, setToken }
  }, [tokens, setTokens])

  return (
    <TokenContext.Provider value={memoizedTokens}>
      {children}
    </TokenContext.Provider>
  )
}
