import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import db from '@/db'
import { deleteFn, insertFn, updateFn } from '@/helpers'
import { Coords, isTypeCoords, isTypeToken, NewToken, Token } from '@/types'

interface TokenContextType {
  tokens: Token[]
  insertToken: Function
  updateToken: Function
  deleteToken: Function
  newToken: NewToken
  setNewTokenCoords: Function
}

export const TokenContext = createContext<TokenContextType>({
  tokens: [],
  insertToken: () => {},
  updateToken: () => {},
  deleteToken: () => {},
  newToken: {
    x: null,
    y: null,
    name: '',
    ring: null,
    imgUrl: '',
    uuid: '',
  },
  setNewTokenCoords: () => {},
})

export function TokenProvider(
  props: PropsWithChildren<{ mapId: number; tokens: Token[] }>,
) {
  // TODO generate types from db
  // https://supabase.com/docs/guides/api/rest/generating-types
  const [tokens, setTokens] = useState<Token[]>(props.tokens)
  const [newToken, setNewToken] = useState<NewToken>({
    x: null,
    y: null,
    name: '',
    ring: null,
    imgUrl: '',
    uuid: '',
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
              setTokens(insertFn<Token>(data.new as Token))
            } else if (data.eventType === 'UPDATE' && data.new.id) {
              setTokens(updateFn<Token>(data.new as Token))
            } else if (data.eventType === 'DELETE' && data.old.id) {
              setTokens(deleteFn<Token>(data.old as Token))
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
    async function insertToken(token: Token) {
      // Create locally
      setTokens(insertFn<Token>(token))

      // Create on server
      await db.from('tokens').insert({ ...token, mapId: props.mapId })
    }
    async function updateToken(token: Token) {
      // Update locally
      setTokens(updateFn<Token>(token))

      // Update on server
      await db.from('tokens').update(token).eq('id', token.id)
    }

    async function deleteToken(token: Token) {
      // Delete locally
      setTokens(deleteFn<Token>(token))

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
