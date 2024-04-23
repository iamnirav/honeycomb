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
  const { isOver, setNodeRef } = useDroppable({ id })

  if (isDroppable) {
    return (
      <div
        ref={setNodeRef}
        className={clsx('Hex', className, { isOver: 'bg-red-600' })}
      >
        {children}
      </div>
    )
  } else {
    return <div className={`Hex ${className}`}>{children}</div>
  }
}
