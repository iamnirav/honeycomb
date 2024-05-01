import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Avatar, useDisclosure } from '@nextui-org/react'
import TokenModal from './TokenModal'

type TokenProps = {
  token: { id?: number; imgUrl: string; name: string }
  size?: 'sm' | 'md' | 'lg'
}

export default function Token({ token, size = 'lg' }: TokenProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: token.id || token.imgUrl,
      data: { token },
    })

  const disclosure = useDisclosure()

  const style = isDragging
    ? { transform: CSS.Translate.toString(transform), zIndex: 1 }
    : {}

  return (
    <>
      <Avatar
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        isBordered
        src={token.imgUrl}
        size={size}
        onClick={disclosure.onOpen}
        name={token.name}
      />
      <TokenModal token={token} {...disclosure} />
    </>
  )
}
