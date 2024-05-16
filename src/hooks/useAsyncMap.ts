import { useEffect, useState } from 'react'
import db from '@/db'
import localStorage from '@/localStorage'
import { Map, Token } from '@/types'

export default function useAsyncMap(uuid: string) {
  const [result, setResult] = useState<{
    map: Map | null
    tokens: Token[]
  }>({
    map: null,
    tokens: [],
  })

  // Initial load of map and tokens
  useEffect(() => {
    const ac = new AbortController()

    // TODO get initial tokens via server component
    // https://supabase.com/docs/guides/realtime/realtime-with-nextjs
    async function fetchTokens() {
      const { data, error } = await db
        .from('maps')
        .select(
          'id, uuid, name, tiles, tokens (id, imgUrl, name, x, y, ring, uuid)',
        )
        .filter('uuid', 'eq', uuid)
        .limit(1)
        .abortSignal(ac.signal)

      if (!error && data.length) {
        const map = data[0]
        document.title = `${map.name} · Honeycomb`
        const { id, uuid, name, tiles, tokens } = map
        setResult({ map: { id, uuid, name, tiles }, tokens })
        localStorage.upsertMap(map)
      }
    }

    fetchTokens()

    return () => {
      ac.abort()
    }
  }, [uuid])

  return result
}
