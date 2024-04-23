import { useContext } from 'react'
import { DndContext } from '@dnd-kit/core'
import { TokenContext } from '@/app/map/TokenContext'
import Layer from '@/app/map/Layer'
import Token from '@/app/map/Token'

export default function TokenLayer() {

  const tokens = useContext(TokenContext);

  const contentsMap = Object.entries(tokens).reduce((acc, [key, url]) => {
    (acc as any)[key] = <Token src={url as any} />
    return acc;
  }, {})

  return (
    <DndContext>
      <Layer classNameAll='' classNameMap={{}} contentsMap={contentsMap} />
    </DndContext>
  )
}