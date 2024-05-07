import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
import { coordsMath, isTypeToken, Token as TokenType } from '@/../helpers'
import Token from '@/map/Token'

interface HexProps {
  className?: string
  isDroppable: boolean
  coords: { x: number; y: number }
}

interface DragState {
  type: 'idle' | 'over'
  data?: { token?: TokenType }
}

export default function Hex({
  className,
  children,
  isDroppable,
  coords,
}: PropsWithChildren<HexProps>) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragState, setDragState] = useState<DragState>({
    type: 'idle',
  })

  useEffect(() => {
    const element = ref.current
    invariant(element)

    return dropTargetForElements({
      element,
      getData: () => ({ coords }),
      canDrop({ source }) {
        const {
          data: { token },
        }: any = source
        return isDroppable && (!token || !coordsMath.isEqual(coords, token))
      },
      onDragEnter({ source }) {
        setDragState({ type: 'over', data: source.data })
      },
      onDragLeave: () =>
        setDragState({
          type: 'idle',
        }),
      onDrop: () =>
        setDragState({
          type: 'idle',
        }),
    })
  }, [coords, isDroppable])

  return (
    <div
      ref={ref}
      className={clsx('Hex', className, {
        DropTarget: dragState.type === 'over',
      })}
    >
      {children}
      {dragState.type === 'over' && (
        <div className="absolute">
          <Token token={dragState.data?.token} />
        </div>
      )}
    </div>
  )
}
