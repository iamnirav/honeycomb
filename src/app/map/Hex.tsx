import { PropsWithChildren } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'

type HexProps = {
  className?: string
  isDroppable: boolean
  coords: { x: number; y: number }
}

export default function Hex({
  className,
  children,
  isDroppable,
  coords,
}: PropsWithChildren<HexProps>) {
  const { isOver, setNodeRef } = useDroppable({
    id: JSON.stringify(coords),
    disabled: !isDroppable,
    data: { coords },
  })

  return (
    <div
      ref={setNodeRef}
      className={clsx('Hex', className, { DropTarget: isOver })}
    >
      {children}
    </div>
  )
}
