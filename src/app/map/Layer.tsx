type LayerProps = {
  classNameAll: string,
  classNameMap: { [key: string]: string }
}

export default function Layer( { classNameAll, classNameMap } : LayerProps) {

  const defaultNumRows = 8
  const defaultNumCols = 8
  const rows = []

  for (let y = 0; y < defaultNumRows; y++) {
      const hexes = []

      for (let x = 0; x < defaultNumCols; x++) {
        hexes.push(<div className={`Hex ${classNameMap[`${x},${y}`]}`} key={x} />)
      }

      rows.push(<div className="HexRow" key={y}>{hexes}</div>)
  }

  return (
    <div className="Layer row-span-full col-span-full">
      {rows}
    </div>
  )
}
