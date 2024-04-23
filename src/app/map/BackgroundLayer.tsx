import Layer from '@/app/map/Layer'

export default function TokenLayer() {
  return (
    <Layer
      classNameAll="HexFilled"
      classNameMap={{}}
      contentsMap={{}}
      isDroppable={true}
    />
  )
}
