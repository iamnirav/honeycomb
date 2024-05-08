'use client'

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
import { TokenProvider } from '@/map/TokenContext'
import TokenLayer from '@/map/TokenLayer'
import MapModal from '../MapModal'

interface MapPageProps {
  params: { mapUuid: string }
}

export default function Map({ params }: MapPageProps) {
  const disclosure = useDisclosure()

  return (
    <TokenProvider mapUuid={params.mapUuid}>
      <Navbar className="fixed">
        <NavbarBrand className="text-2xl">⬡</NavbarBrand>
        <NavbarContent justify="center">
          <Bench />
        </NavbarContent>
        <NavbarContent justify="end">
          <Button onPress={disclosure.onOpen}>Maps</Button>
        </NavbarContent>
      </Navbar>
      <main className="px-4 pt-20 pb-10">
        <GridContainer>
          {/* Background layer */}
          <BackgroundLayer />

          {/* Token layer */}
          <TokenLayer />
        </GridContainer>
      </main>
      <MapModal {...disclosure} />
    </TokenProvider>
  )
}
