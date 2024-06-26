import { MouseEventHandler, ReactNode } from 'react'
import clsx from 'clsx'
import { DEFAULT_MAX_X, DEFAULT_MAX_Y } from '@/constants'
import { HexStyle } from '@/types'
import Hex from './Hex'

export interface LayerProps {
  className?: string
  contents?: ReactNode[][]
  styles?: HexStyle[][]
  isDroppable?: boolean
  onHexClick?: MouseEventHandler<HTMLDivElement>
}

export default function Layer({
  className,
  contents = [],
  styles = [],
  isDroppable = false,
  onHexClick,
}: LayerProps) {
  const rows = []

  for (let y = 0; y < DEFAULT_MAX_Y; y++) {
    const hexes = []

    // Using doubled/interlaced coordinates for ease of rendering
    // https://www.redblobgames.com/grids/hexagons/#coordinates-doubled
    for (
      let x = y & 1 ? 1 : 0; // if y is odd, start at 1; if y is even, start at 0
      x < DEFAULT_MAX_X;
      x = x + 2
    ) {
      const children = contents[x] && contents[x][y]

      hexes.push(
        <Hex
          isDroppable={isDroppable && !children}
          key={x}
          coords={{ x, y }}
          style={(styles[x] && styles[x][y]) || undefined}
          onClick={onHexClick}
        >
          {children}
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
