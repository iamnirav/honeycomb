import { useDraggable } from '@dnd-kit/core'
import { Avatar } from '@nextui-org/react'

type TokenProps = {
  src: string
}

export default function Token({ src }: TokenProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: src,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <Avatar
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      isBordered
      src={src}
      size="lg"
    />
  )
}
