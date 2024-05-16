'use client'

import { useState } from 'react'
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  useDisclosure,
} from '@nextui-org/react'
import db from '@/db'
import useAsyncMap from '@/hooks/useAsyncMap'
import Bench from '../Bench'
import GridContainer from '../GridContainer'
import { MapProvider } from '../MapContext'
import MapModal from '../MapModal'
import Palette, { BackgroundColor } from '../Palette'
import TileLayer from '../TileLayer'
import { TokenProvider } from '../TokenContext'
import TokenLayer from '../TokenLayer'

interface MapPageProps {
  params: { mapUuid: string }
}

export default function Map({ params }: MapPageProps) {
  const { map, tokens } = useAsyncMap(params.mapUuid)
  const disclosure = useDisclosure()
  const [layer, setLayer] = useState<'token' | 'tile'>('tile')
  const [brush, setBrush] = useState<BackgroundColor>(null)

  if (!map) return

  // async function test() {
  //   if (!map) return
  //   const styles: HexStyle[][] = []
  //   styles[10] = []
  //   styles[10][10] = {
  //     top: { borderBottomColor: 'rgb(34 197 94)' },
  //     middle: { backgroundColor: 'rgb(34 197 94)' },
  //     bottom: { borderTopColor: 'rgb(34 197 94)' },
  //   }

  //   await db
  //     .from('maps')
  //     .update({
  //       tiles: styles,
  //     })
  //     .eq('id', map.id)
  // }

  return (
    <MapProvider map={map}>
      <TokenProvider mapId={map.id} tokens={tokens}>
        <Navbar className="fixed">
          <NavbarBrand className="text-2xl">⬡</NavbarBrand>
          <NavbarContent justify="center">
            {layer === 'token' && <Bench />}
            {layer === 'tile' && <Palette brush={brush} setBrush={setBrush} />}
          </NavbarContent>
          <NavbarContent justify="end">
            <Button
              onPress={() => setLayer(layer === 'token' ? 'tile' : 'token')}
            >
              Toggle Layer
            </Button>
            <Button onPress={disclosure.onOpen}>Maps</Button>
          </NavbarContent>
        </Navbar>
        <main className="px-4 pt-20 pb-10">
          <GridContainer>
            {/* Tile layer */}
            <TileLayer isFocused={layer === 'tile'} />

            {/* Token layer */}
            <TokenLayer isFocused={layer === 'token'} />
          </GridContainer>
        </main>
        <MapModal {...disclosure} />
      </TokenProvider>
    </MapProvider>
  )
}
