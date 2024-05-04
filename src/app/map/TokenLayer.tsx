import { ReactNode, useContext, useState } from 'react'
import { useDndMonitor } from '@dnd-kit/core'
import Layer from '@/map/Layer'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function TokenLayer() {
  const { tokens } = useContext(TokenContext)
  const [dragSourceHex, setDragSourceHex] = useState<{
    x?: number
    y?: number
  }>({})

  useDndMonitor({
    onDragStart(event) {
      const { x, y } = event.active.data.current?.token
      setDragSourceHex({ x, y })
    },
    onDragEnd() {
      setDragSourceHex({})
    },
    onDragCancel() {
      setDragSourceHex({})
    },
  })

  const contentsMap: ReactNode[][] = tokens.reduce(
    (
      acc: ReactNode[][],
      token: { x: number; y: number; imgUrl: string; name: string },
    ) => {
      if (token.x !== null && token.y !== null) {
        if (!acc[token.x]) acc[token.x] = []
        acc[token.x][token.y] = <Token token={token} />
      }

      return acc
    },
    [],
  )

  const classNameMap: string[][] = []
  if (dragSourceHex.x && dragSourceHex.y) {
    if (!classNameMap[dragSourceHex.x]) classNameMap[dragSourceHex.x] = []
    classNameMap[dragSourceHex.x][dragSourceHex.y] = 'DragSource'
  }

  return (
    <Layer
      className="TokenLayer"
      contentsMap={contentsMap}
      classNameMap={classNameMap}
      isDroppable={true}
    />
  )
}
