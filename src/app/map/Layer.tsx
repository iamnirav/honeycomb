import { ReactNode } from "react"
import Hex from "@/app/map/Hex"

type LayerProps = {
  classNameAll: string,
  classNameMap: { [key: string]: string }
  contentsMap: { [key: string]: ReactNode }
}

export default function Layer( { classNameAll, classNameMap, contentsMap } : LayerProps) {

  const defaultNumRows = 8
  const defaultNumCols = 8
  const rows = []

  for (let y = 0; y < defaultNumRows; y++) {
      const hexes = []

      for (let x = 0; x < defaultNumCols; x++) {
        hexes.push(<Hex className={`${classNameAll} ${classNameMap[`${x},${y}`] || ''}`} id={`${x},${y}`} key={x}>
          {contentsMap[`${x},${y}`]}
        </Hex>)
      }

      rows.push(<div className="HexRow" key={y}>{hexes}</div>)
  }

  return (
    <div className="Layer row-span-full col-span-full">
      {rows}
    </div>
  )
}
