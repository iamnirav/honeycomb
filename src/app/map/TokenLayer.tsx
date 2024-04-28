import { useContext } from 'react'
import { DndContext } from '@dnd-kit/core'
import Layer from '@/map/Layer'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function TokenLayer() {
  const { tokens, setToken } = useContext(TokenContext)

  const contentsMap = tokens.reduce((acc, token) => {
    const key = `${token.x},${token.y}`
    ;(acc as any)[key] = (
      <Token token={token} src={token.img_url as any} coords={key} />
    )
    return acc
  }, {})

  // Could be improved by implementing a typesafe wrapper around dndkit
  // e.g., https://github.com/clauderic/dnd-kit/issues/935
  function handleDragEnd(event: any) {
    if (
      event.over?.id &&
      event.active.data.current?.coords &&
      event.over.id !== event.active.data.current.coords &&
      !tokens.some(
        (token) =>
          token.x === event.over.data.current.x &&
          token.y === event.over.data.current.y,
      )
    ) {
      setToken({
        ...event.active.data.current.token,
        x: event.over.data.current.x,
        y: event.over.data.current.y,
      })
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
