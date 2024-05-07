import { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { Avatar, useDisclosure } from '@nextui-org/react'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
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
  const ref = useRef<HTMLSpanElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    invariant(element)
    return draggable({
      element,
      getInitialData: () => ({ token }),
      onDragStart: () => setIsDragging(true),
      onDrop() {
        setIsDragging(false)
        if (!token) {
          disclosure.onOpen()
        }
      },
    })
  }, [token, disclosure])

  const avatarProps = token
    ? {
        className: clsx(
          {
            [SIZES[size]]: isOnlyEmoji(token.name.split(' ')[0]),
            'opacity-25': isDragging,
          },
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
        ref={ref}
        {...avatarProps}
        isBordered
        size={size}
        onClick={disclosure.onOpen}
        imgProps={{ className: 'transform-gpu', draggable: false }} // https://stackoverflow.com/questions/75206873/why-does-object-fit-impact-my-image-quality-and-how-to-avoid-it
      />
      <TokenModal token={token} {...disclosure} />
    </>
  )
}
