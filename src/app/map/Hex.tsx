import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
import { coordsMath } from '@/helpers'
import { Token } from '@/types'
import TokenView from './TokenView'

export interface HexStyle {
  top: CSSProperties
  middle: CSSProperties
  bottom: CSSProperties
}

interface HexProps {
  isDroppable: boolean
  coords: { x: number; y: number }
  style?: HexStyle
}

interface DragState {
  type: 'idle' | 'over'
  data?: { token?: Token }
}

export default function Hex({
  children,
  isDroppable,
  coords,
  style = { top: {}, middle: {}, bottom: {} },
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
      className={clsx('Hex', {
        DropTarget: dragState.type === 'over',
      })}
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
