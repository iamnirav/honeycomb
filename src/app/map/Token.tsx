import { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview'
import { Avatar, useDisclosure } from '@nextui-org/react'
import clsx from 'clsx'
import ReactDOM from 'react-dom'
import invariant from 'tiny-invariant'
import { getColor, isOnlyEmoji, shortenName } from '@/../helpers'
import TokenModal from './TokenModal'

type TokenProps = {
  token?: { id?: number; imgUrl: string; name: string; ring?: number }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

type DraggableState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'dragging' }

const IDLE_STATE: DraggableState = { type: 'idle' }
const DRAGGING_STATE: DraggableState = { type: 'dragging' }

const SIZES = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
}

export default function Token({ token, size = 'lg', className }: TokenProps) {
  const disclosure = useDisclosure()
  const ref = useRef<HTMLSpanElement>(null)
  const [draggableState, setDraggableState] =
    useState<DraggableState>(IDLE_STATE)

  useEffect(() => {
    const element = ref.current
    invariant(element)
    return draggable({
      element,
      getInitialData: () => ({ token }),
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render({ container }) {
            setDraggableState({ type: 'preview', container })
            return () => setDraggableState(DRAGGING_STATE)
          },
        })
      },
      onDragStart: () => setDraggableState(DRAGGING_STATE),
      onDrop() {
        setDraggableState(IDLE_STATE)
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
            'opacity-25': draggableState.type === 'dragging',
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
        imgProps={{
          className: 'transform-gpu',
          draggable: false,
          style: { WebkitTouchCallout: 'none' },
        }} // https://stackoverflow.com/questions/75206873/why-does-object-fit-impact-my-image-quality-and-how-to-avoid-it
      />
      <TokenModal token={token} {...disclosure} />
      {draggableState.type === 'preview' &&
        ReactDOM.createPortal(
          <div className="p-2">
            <Avatar
              {...avatarProps}
              isBordered
              size={size}
              imgProps={{
                className: 'transform-gpu',
                draggable: false,
                style: { WebkitTouchCallout: 'none' },
              }} // https://stackoverflow.com/questions/75206873/why-does-object-fit-impact-my-image-quality-and-how-to-avoid-it
            />
          </div>,
          draggableState.container,
        )}
    </>
  )
}
