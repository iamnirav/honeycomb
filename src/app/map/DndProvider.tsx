import { PropsWithChildren, useContext } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { TokenContext } from '@/map/TokenContext'

export default function DndProvider({ children }: PropsWithChildren) {
  const { tokens, updateToken } = useContext(TokenContext)

  // Could be improved by implementing a typesafe wrapper around dndkit
  // e.g., https://github.com/clauderic/dnd-kit/issues/935
  function handleDragEnd(event: any) {
    if (
      event.over?.data?.current?.coords &&
      // For every token, check that at least one of x/y is not equal to the drop target's x/y
      tokens.every(
        (token: { x: number; y: number }) =>
          token.x !== event.over.data.current.coords.x ||
          token.y !== event.over.data.current.coords.y,
      )
    ) {
      updateToken({
        ...event.active.data.current.token,
        x: event.over.data.current.coords.x,
        y: event.over.data.current.coords.y,
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
      {children}
    </DndContext>
  )
}
