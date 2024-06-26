import { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { disableNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview'
import { preventUnhandled } from '@atlaskit/pragmatic-drag-and-drop/prevent-unhandled'
import { Avatar, useDisclosure } from '@nextui-org/react'
import { UserCirclePlus } from '@phosphor-icons/react'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
import { getColor, isOnlyEmoji, shortenName } from '@/helpers'
import { Token } from '@/types'
import TokenModal from './TokenModal'

type TokenViewProps = {
  token?: Token
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function TokenView({
  token,
  size = 'lg',
  className,
}: TokenViewProps) {
  const disclosure = useDisclosure()
  const ref = useRef<HTMLSpanElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    invariant(element)
    return draggable({
      element,
      getInitialData: () => (token ? { token } : { newToken: true }),
      onGenerateDragPreview({ nativeSetDragImage }) {
        disableNativeDragPreview({ nativeSetDragImage })
        preventUnhandled.start()
      },
      onDragStart() {
        setIsDragging(true)
      },
      onDrop() {
        preventUnhandled.stop()
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
            'emoji-name': isOnlyEmoji(token.name.split(' ')[0]),
            'opacity-25': isDragging,
          },
          'TokenView',
          'cursor-pointer',
          className,
        ),
        color: getColor(token.ring),
        getInitials: shortenName,
        name: token.name,
        src: token.imgUrl,
        isBordered: true,
      }
    : {
        name: '',
        icon: <UserCirclePlus size={30} weight="duotone" />,
        className: clsx('TokenView', 'cursor-pointer', className),
      }

  return (
    <>
      <Avatar
        ref={ref}
        {...avatarProps}
        size={size}
        onClick={disclosure.onOpen}
        imgProps={{
          className: 'transform-gpu',
          draggable: false,
          style: { WebkitTouchCallout: 'none' },
        }} // https://stackoverflow.com/questions/75206873/why-does-object-fit-impact-my-image-quality-and-how-to-avoid-it
      />
      <TokenModal token={token} {...disclosure} />
    </>
  )
}
