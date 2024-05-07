import { ReactNode } from 'react'
import clsx from 'clsx'
import Hex from '@/map/Hex'
import { DEFAULT_MAX_X, DEFAULT_MAX_Y } from '../../constants'

type LayerProps = {
  className?: string
  contentsMap?: ReactNode[][]
  classNameMap?: string[][]
  isDroppable?: boolean
}

export default function Layer({
  className,
  contentsMap = [],
  classNameMap = [],
  isDroppable = false,
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
      const contents = contentsMap[x] && contentsMap[x][y]
      hexes.push(
        <Hex
          isDroppable={isDroppable && !contents}
          key={x}
          coords={{ x, y }}
          className={classNameMap[x] && classNameMap[x][y]}
        >
          {contents}
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
