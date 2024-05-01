import { ReactNode } from 'react'
import clsx from 'clsx'
import Hex from '@/map/Hex'
import { DEFAULT_NUM_COLS, DEFAULT_NUM_ROWS } from '../../constants'

type LayerProps = {
  className?: string
  contentsMap?: ReactNode[][]
  isDroppable?: boolean
}

export default function Layer({
  className,
  contentsMap,
  isDroppable = false,
}: LayerProps) {
  const rows = []

  for (let y = 0; y < DEFAULT_NUM_ROWS; y++) {
    const hexes = []

    for (let x = 0; x < DEFAULT_NUM_COLS; x++) {
      const coords = `${x},${y}`
      hexes.push(
        <Hex isDroppable={isDroppable} key={x} coords={{ x, y }}>
          {contentsMap && contentsMap[x][y]}
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
