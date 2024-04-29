import { useContext } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import Layer from '@/map/Layer'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function TokenLayer() {
  const { tokens, updateToken } = useContext(TokenContext)

  const contentsMap = tokens.reduce(
    (acc: any, token: { x: number; y: number; imgUrl: string }) => {
      const key = `${token.x},${token.y}`
      acc[key] = <Token token={token} src={token.imgUrl as any} coords={key} />
      return acc
    },
    {},
  )

  // Could be improved by implementing a typesafe wrapper around dndkit
  // e.g., https://github.com/clauderic/dnd-kit/issues/935
  function handleDragEnd(event: any) {
    if (
      event.over?.id &&
      event.active.data.current?.coords &&
      event.over.id !== event.active.data.current.coords &&
      !tokens.some(
        (token: { x: number; y: number }) =>
          token.x === event.over.data.current.x &&
          token.y === event.over.data.current.y,
      )
    ) {
      updateToken({
        ...event.active.data.current.token,
        x: event.over.data.current.x,
        y: event.over.data.current.y,
      })
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  )

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Layer
        className="TokenLayer"
        classNameMap={{}}
        contentsMap={contentsMap}
        isDroppable={true}
      />
    </DndContext>
  )
}
