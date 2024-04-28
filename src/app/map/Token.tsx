import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Avatar } from '@nextui-org/react'

type TokenProps = {
  src: string
  coords: string
  token: any
}

export default function Token({ src, coords, token }: TokenProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: src,
      data: { coords, token },
    })

  const style = isDragging
    ? { transform: CSS.Translate.toString(transform), zIndex: 1 }
    : {}

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
