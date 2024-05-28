'use client'

import { useState } from 'react'
import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import { Hexagon } from '@phosphor-icons/react'
import useAsyncMap from '@/hooks/useAsyncMap'
import Bench from '../Bench'
import GridContainer from '../GridContainer'
import { MapProvider } from '../MapContext'
import { Menu } from '../Menu'
import Palette, { BackgroundColor } from '../Palette'
import TileLayer from '../TileLayer'
import { TokenProvider } from '../TokenContext'
import TokenLayer from '../TokenLayer'

interface MapPageProps {
  params: { mapUuid: string }
}

export default function Map({ params }: MapPageProps) {
  const { map, tokens } = useAsyncMap(params.mapUuid)
  const [layer, setLayer] = useState<'token' | 'tile'>('token')
  const [brush, setBrush] = useState<BackgroundColor>()

  if (!map) return

  return (
    <MapProvider map={map}>
      <TokenProvider mapId={map.id} tokens={tokens}>
        <Navbar className="fixed" isBordered={true}>
          <NavbarBrand>
            <Hexagon size={30} weight="duotone" />
          </NavbarBrand>
          <NavbarContent justify="center">
            {layer === 'token' && <Bench />}
            {layer === 'tile' && <Palette brush={brush} setBrush={setBrush} />}
          </NavbarContent>
          <NavbarContent justify="end">
            <Menu layer={layer} setLayer={setLayer} />
          </NavbarContent>
        </Navbar>
        <main className="px-4 pt-20 pb-10">
          <GridContainer>
            {/* Tile layer */}
            <TileLayer isFocused={layer === 'tile'} brush={brush} />

            {/* Token layer */}
            <TokenLayer isFocused={layer === 'token'} />
          </GridContainer>
        </main>
      </TokenProvider>
    </MapProvider>
  )
}
