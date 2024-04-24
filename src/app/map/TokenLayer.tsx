import { useContext } from 'react'
import { DndContext } from '@dnd-kit/core'
import Layer from '@/map/Layer'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function TokenLayer() {
  const { tokens, setTokens } = useContext(TokenContext)

  const contentsMap = Object.entries(tokens).reduce((acc, [key, url]) => {
    ;(acc as any)[key] = <Token src={url as any} coords={key} />
    return acc
  }, {})

  // Could be improved by implementing a typesafe wrapper around dndkit
  // e.g., https://github.com/clauderic/dnd-kit/issues/935
  function handleDragEnd(event: any) {
    if (
      event.over?.id &&
      event.active.data.current?.coords &&
      event.over.id !== event.active.data.current.coords &&
      !tokens[event.over.id]
    ) {
      const newTokens = {
        ...tokens,
        [event.over.id]: event.active.id,
      }
      delete newTokens[event.active.data.current.coords]
      setTokens(newTokens)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Layer
        className="TokenLayer"
        classNameMap={{}}
        contentsMap={contentsMap}
        isDroppable={true}
      />
    </DndContext>
  )
}
