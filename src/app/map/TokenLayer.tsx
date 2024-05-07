import { ReactNode, useContext, useState } from 'react'
import Layer from '@/map/Layer'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function TokenLayer() {
  const { tokens } = useContext(TokenContext)
  const [dragSourceHex, setDragSourceHex] = useState<{
    x?: number
    y?: number
  }>({})

  const contentsMap: ReactNode[][] = tokens.reduce(
    (
      acc: ReactNode[][],
      token: { x: number; y: number; imgUrl: string; name: string },
    ) => {
      if (token.x !== null && token.y !== null) {
        if (!acc[token.x]) acc[token.x] = []
        acc[token.x][token.y] = <Token token={token} className="absolute" />
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
