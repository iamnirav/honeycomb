import { PropsWithChildren } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'

type HexProps = {
  className: string
  id: string
  isDroppable: boolean
}

export default function Hex({
  className,
  children,
  id,
  isDroppable,
}: PropsWithChildren<HexProps>) {
  const { isOver, setNodeRef } = useDroppable({ id, disabled: !isDroppable })

  return (
    <div
      ref={setNodeRef}
      className={clsx('Hex', className, { DropTarget: isOver })}
    >
      {children}
    </div>
  )
}
