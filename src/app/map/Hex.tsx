import { PropsWithChildren } from "react"
import { useDroppable } from '@dnd-kit/core'

type HexProps = {
  className: string,
  id: string,
}

export default function Hex({ className, children, id }: PropsWithChildren<HexProps>) {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (<div ref={setNodeRef} className={`Hex ${isOver ? 'bg-red-600' : ''} ${className}`}>
    {children}
  </div>)
} 