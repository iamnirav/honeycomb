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
  const { tokens, updateToken, setNewTokenCoords } = useContext(TokenContext)

  // Could be improved by implementing a typesafe wrapper around dndkit
  // e.g., https://github.com/clauderic/dnd-kit/issues/935
  function handleDragEnd(event: any) {
    if (event.over?.data?.current?.coords) {
      const { x, y } = event.over.data.current.coords
      if (
        // If both coordinates are null, we're adding to the bench
        (x === null && y === null) ||
        // Otherwise, for every token, check that at least one of x/y is not equal to the drop target's x/y
        tokens.every(
          (token: { x: number; y: number }) => token.x !== x || token.y !== y,
        )
      ) {
        // If the draggable has no token object, we'll be opening the form to add a new one, so just populate coordinates
        if (!event.active.data.current.token) {
          setNewTokenCoords(x, y)
          event.active.data.current.callback()
        } else {
          updateToken({
            ...event.active.data.current.token,
            x,
            y,
          })
        }
      }
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
