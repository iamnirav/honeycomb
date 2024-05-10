'use client'

import { useState } from 'react'
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from '@nextui-org/react'
import BackgroundLayer from '@/map/BackgroundLayer'
import Bench from '@/map/Bench'
import GridContainer from '@/map/GridContainer'
import { MapProvider } from '@/map/MapContext'
import MapModal from '@/map/MapModal'
import Palette, { BackgroundColor } from '@/map/Palette'
import { TokenProvider } from '@/map/TokenContext'
import TokenLayer from '@/map/TokenLayer'
import useAsyncMap from '../useAsyncMap'

interface MapPageProps {
  params: { mapUuid: string }
}

export default function Map({ params }: MapPageProps) {
  const { map, tokens } = useAsyncMap(params.mapUuid)
  const disclosure = useDisclosure()
  const [layer, setLayer] = useState<'token' | 'background'>('background')
  const [brush, setBrush] = useState<BackgroundColor>(null)

  if (!map) return

  return (
    <MapProvider map={map}>
      <TokenProvider mapId={map.id} tokens={tokens}>
        <Navbar className="fixed">
          <NavbarBrand className="text-2xl">⬡</NavbarBrand>
          <NavbarContent justify="center">
            {layer === 'token' && <Bench />}
            {layer === 'background' && (
              <Palette brush={brush} setBrush={setBrush} />
            )}
          </NavbarContent>
          <NavbarContent justify="end">
            <Button
              onPress={() =>
                setLayer(layer === 'token' ? 'background' : 'token')
              }
            >
              Toggle Layer
            </Button>
            <Button onPress={disclosure.onOpen}>Maps</Button>
          </NavbarContent>
        </Navbar>
        <main className="px-4 pt-20 pb-10">
          <GridContainer>
            {/* Background layer */}
            <BackgroundLayer isFocused={layer === 'background'} />

            {/* Token layer */}
            <TokenLayer isFocused={layer === 'token'} />
          </GridContainer>
        </main>
        <MapModal {...disclosure} />
      </TokenProvider>
    </MapProvider>
  )
}
