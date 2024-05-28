import { useContext, useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
import { TokenContext } from './TokenContext'
import Token from './TokenView'

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
      canDrop({ source }) {
        const {
          data: { token },
        }: any = source
        return !!token && token.x !== null && token.y !== null
      },
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    })
  }, [])

  let bgClass = 'bg-white/75'
  if (isDraggedOver) {
    bgClass = 'bg-white'
  }

  const benchTokens = tokens.filter(
    (token: any) => token.x === null || token.y === null,
  )

  return (
    <div
      ref={ref}
      className={`inline-flex p-2 shadow-inner rounded-full shadow-black/25 ${bgClass}`}
    >
      {benchTokens.map((token: any) => (
        <Token key={token.uuid} size="sm" token={token} />
      ))}
      <Token size="sm" className={clsx({ 'ml-4': benchTokens.length })} />
    </div>
  )
}
