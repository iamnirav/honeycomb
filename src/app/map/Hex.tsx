import { PropsWithChildren } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'

type HexProps = {
  className: string
  id: string
  isDroppable: boolean
  x: number
  y: number
}

export default function Hex({
  className,
  children,
  id,
  isDroppable,
  x,
  y,
}: PropsWithChildren<HexProps>) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: !isDroppable,
    data: {
      x,
      y,
    },
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
