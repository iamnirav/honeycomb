import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Avatar, useDisclosure } from '@nextui-org/react'
import clsx from 'clsx'
import { getColor, isOnlyEmoji, shortenName } from '@/../helpers'
import TokenModal from './TokenModal'

type TokenProps = {
  token?: { id?: number; imgUrl: string; name: string; ring?: number }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
}

export default function Token({ token, size = 'lg', className }: TokenProps) {
  const disclosure = useDisclosure()

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: token?.id || 'new-token-button',
      data: token ? { token } : { callback: disclosure.onOpen },
    })

  const style = isDragging
    ? { transform: CSS.Translate.toString(transform), zIndex: 50 }
    : {}

  const avatarProps = token
    ? {
        className: clsx(
          isOnlyEmoji(token.name.split(' ')[0]) ? SIZES[size] : '',
          className,
        ),
        color: getColor(token.ring),
        getInitials: shortenName,
        name: token.name,
        src: token.imgUrl,
      }
    : {
        name: '...',
        className,
      }

  return (
    <>
      <Avatar
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        {...avatarProps}
        isBordered
        size={size}
        onClick={disclosure.onOpen}
        imgProps={{ className: 'transform-gpu' }}
      />
      <TokenModal token={token} {...disclosure} />
    </>
  )
}
