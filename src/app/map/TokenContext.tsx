import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import db from '@/../db'
import {
  Coords,
  deleteFn,
  insertFn,
  isTypeCoords,
  isTypeToken,
  Token,
  updateFn,
} from '@/../helpers'

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

export function TokenProvider(
  props: PropsWithChildren<{ mapId: number; tokens: Token[] }>,
) {
  // TODO generate types from db
  // https://supabase.com/docs/guides/api/rest/generating-types
  const [tokens, setTokens] = useState(props.tokens)
  const [newToken, setNewToken] = useState<NewTokenType>({
    x: null,
    y: null,
    name: '',
    ring: null,
    imgUrl: '',
  })

  // Scroll to middle of map on load
  useEffect(() => {
    window.scroll(
      document.body.offsetWidth / 2 - window.innerWidth / 2,
      document.body.offsetHeight / 2 - window.innerHeight / 2,
    )
  }, [props.mapId])

  // Subscribe to token updates
  // TODO change to using supabase broadcast for live updates to ease load on db
  useEffect(() => {
    // Only subscribe once mapId has been fetched
    if (!props.mapId) return

    const channel = db.channel('tokens-channel')
    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tokens',
          filter: `mapId=eq.${props.mapId}`,
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
  }, [props.mapId])

  // Memoize context functions object for the rest of the app to use
  const memoizedTokenContext: TokenContextType = useMemo(() => {
    async function insertToken(token: {}) {
      // Create locally
      setTokens(insertFn(token))

      // Create on server
      await db.from('tokens').insert({ ...token, mapId: props.mapId })
    }
    async function updateToken(token: Token) {
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

    function setNewTokenCoords(coords: Coords) {
      setNewToken({ ...newToken, ...coords })
    }

    return {
      tokens,
      insertToken,
      updateToken,
      deleteToken,
      newToken,
      setNewTokenCoords,
    }
  }, [tokens, setTokens, newToken, setNewToken, props.mapId])

  // Set up drop monitor
  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const { token } = source.data
        const target = location.current.dropTargets[0]

        // Dropped outside any drop targets
        if (!target) return

        // Type guard
        if (!isTypeCoords(target.data.coords)) return

        if (!token) {
          // If no token, we're opening form to add a new one, so only populate coordinates
          memoizedTokenContext.setNewTokenCoords(target.data.coords)
        } else if (isTypeToken(token)) {
          // If token exists + type guard, update
          memoizedTokenContext.updateToken({
            ...token,
            ...target.data.coords,
          })
        }
      },
    })
  })

  return (
    <TokenContext.Provider value={memoizedTokenContext}>
      {props.children}
    </TokenContext.Provider>
  )
}
