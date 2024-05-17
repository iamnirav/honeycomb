import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
import { coordsMath } from '@/helpers'
import { HexStyle, Token } from '@/types'
import TokenView from './TokenView'

interface HexProps {
  isDroppable: boolean
  coords: { x: number; y: number }
  style?: HexStyle
  onClick?: MouseEventHandler<HTMLDivElement>
}

interface DragState {
  type: 'idle' | 'over'
  data?: { token?: Token }
}

export default function Hex({
  children,
  isDroppable,
  coords,
  onClick,
  style = { top: {}, middle: {}, bottom: {} },
}: PropsWithChildren<HexProps>) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragState, setDragState] = useState<DragState>({
    type: 'idle',
  })

  // Set up drop target for tokens
  useEffect(() => {
    const element = ref.current
    invariant(element)

    return dropTargetForElements({
      element,
      getData: () => ({ coords }),
      canDrop({ source }) {
        const {
          data: { token },
        } = source
        return (
          isDroppable && (!token || !coordsMath.isEqual(coords, token as Token))
        )
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
      className={clsx('Hex', {
        DropTarget: dragState.type === 'over',
      })}
      onClick={onClick}
      data-x={coords.x}
      data-y={coords.y}
    >
      <div className="HexTop" style={style.top} />
      <div className="HexMiddle" style={style.middle}>
        {children}
        {dragState.type === 'over' && (
          <div className="absolute">
            <TokenView token={dragState.data?.token} />
          </div>
        )}
      </div>
      <div className="HexBottom" style={style.bottom} />
    </div>
  )
}
