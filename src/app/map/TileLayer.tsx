import { useContext } from 'react'
import Layer, { LayerProps } from './Layer'
import { MapContext } from './MapContext'

interface TileLayerProps {
  isFocused: boolean
}

export default function TileLayer({ isFocused }: TileLayerProps) {
  const { map } = useContext(MapContext)

  const props: LayerProps = {
    className: 'TileLayer',
  }

  if (map.tiles) {
    props.styles = map.tiles
  }

  return <Layer {...props} />
}
