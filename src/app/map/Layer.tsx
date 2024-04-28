import { ReactNode } from 'react'
import clsx from 'clsx'
import Hex from '@/map/Hex'

type LayerProps = {
  className?: string
  classNameMap: { [key: string]: string }
  contentsMap: { [key: string]: ReactNode }
  isDroppable?: boolean
}

const NUM_ROWS = 8
const NUM_COLS = 8

export default function Layer({
  className,
  classNameMap,
  contentsMap,
  isDroppable,
}: LayerProps) {
  const rows = []

  for (let y = 0; y < NUM_ROWS; y++) {
    const hexes = []

    for (let x = 0; x < NUM_COLS; x++) {
      const coords = `${x},${y}`
      hexes.push(
        <Hex
          className={clsx(classNameMap[coords])}
          isDroppable={!!isDroppable}
          id={coords}
          key={coords}
          x={x}
          y={y}
        >
          {contentsMap[coords]}
        </Hex>,
      )
    }

    rows.push(
      <div className="HexRow" key={y}>
        {hexes}
      </div>,
    )
  }

  return (
    <div className={clsx('Layer row-span-full col-span-full', className)}>
      {rows}
    </div>
  )
}
