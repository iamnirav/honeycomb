import { useContext, useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import invariant from 'tiny-invariant'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function Bench() {
  const { tokens } = useContext(TokenContext)

  const ref = useRef<HTMLDivElement>(null)
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    invariant(element)

    return dropTargetForElements({
      element,
      getData: () => ({ coords: { x: null, y: null } }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    })
  }, [])

  let bgClass = 'bg-white/75'
  if (isDraggedOver) {
    bgClass = 'bg-white'
  }

  return (
    <div
      ref={ref}
      className={`inline-flex p-3 shadow-inner rounded-full shadow-black/25 ${bgClass}`}
    >
      {tokens
        .filter((token: any) => token.x === null || token.y === null)
        .map((token: any) => (
          <Token
            key={token.id || token.name || token.imgUrl}
            size="sm"
            token={token}
          />
        ))}
      <Token size="sm" className="ml-4" />
    </div>
  )
}
