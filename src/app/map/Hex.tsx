import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import clsx from 'clsx'
import invariant from 'tiny-invariant'
import { coordsMath } from '@/../helpers'

type HexProps = {
  className?: string
  isDroppable: boolean
  coords: { x: number; y: number }
}

export default function Hex({
  className,
  children,
  isDroppable,
  coords,
}: PropsWithChildren<HexProps>) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    invariant(element)

    return dropTargetForElements({
      element,
      getData: () => ({ coords }),
      canDrop({ source }) {
        const {
          data: { token },
        }: any = source
        return isDroppable && (!token || !coordsMath.isEqual(coords, token))
      },
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    })
  }, [coords, isDroppable])

  return (
    <div
      ref={ref}
      className={clsx('Hex', className, { DropTarget: isDraggedOver })}
    >
      {children}
    </div>
  )
}
