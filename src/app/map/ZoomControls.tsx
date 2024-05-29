import { useState } from 'react'
import { Button, ButtonGroup } from '@nextui-org/react'
import {
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from '@phosphor-icons/react'

const ZOOM_MAX = 1
const ZOOM_MIN = 0
const ZOOM_INCREMENT = 0.1

function zoomFn(setZoom: Function, dir: -1 | 1) {
  return () => {
    setZoom((zoom: number) => {
      const newZoom = Math.round((zoom + dir * ZOOM_INCREMENT) * 10) / 10 // round off javascript adding errors
      if (newZoom >= ZOOM_MIN && newZoom <= ZOOM_MAX) {
        document.documentElement.style.setProperty('--zoom', `${newZoom}`)
        return newZoom
      } else {
        return zoom
      }
    })
  }
}

export default function ZoomControls() {
  const [zoom, setZoom] = useState<number>(0.5)
  return (
    <ButtonGroup>
      <Button isIconOnly onPress={zoomFn(setZoom, -1)}>
        <MagnifyingGlassMinus size={30} weight="duotone" />
      </Button>
      <Button isIconOnly onPress={zoomFn(setZoom, 1)}>
        <MagnifyingGlassPlus size={30} weight="duotone" />
      </Button>
    </ButtonGroup>
  )
}
