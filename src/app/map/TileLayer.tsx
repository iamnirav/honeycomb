import { useContext } from 'react'
import { createHexStyle } from '@/helpers'
import { HexStyle } from '@/types'
import Layer, { LayerProps } from './Layer'
import { MapContext } from './MapContext'
import { BackgroundColor } from './Palette'

interface TileLayerProps {
  isFocused: boolean
  brush?: BackgroundColor
}

export default function TileLayer({ isFocused, brush }: TileLayerProps) {
  const { map, updateTiles } = useContext(MapContext)

  const props: LayerProps = {
    className: 'TileLayer',
  }

  if (map.tiles) {
    props.styles = map.tiles
  }

  // Set up click handler for painting tiles
  if (isFocused && brush) {
    props.onHexClick = (event) => {
      let newTiles: HexStyle[][]
      const { x, y } = event.currentTarget.dataset

      if (!x || !y) return

      const numX = Number(x)
      const numY = Number(y)

      newTiles = [...(map.tiles || [])]

      if (!newTiles[Number(numX)]) {
        newTiles[numX] = []
      }

      newTiles[numX][numY] = createHexStyle(brush)

      updateTiles(newTiles)
    }
  }

  return <Layer {...props} />
}
