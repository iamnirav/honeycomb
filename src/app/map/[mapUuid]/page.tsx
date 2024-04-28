'use client'

import { Navbar, NavbarContent } from '@nextui-org/react'
import BackgroundLayer from '@/map/BackgroundLayer'
import Bench from '@/map/Bench'
import GridContainer from '@/map/GridContainer'
import { TokenProvider } from '@/map/TokenContext'
import TokenLayer from '@/map/TokenLayer'
import TokenModal from '@/map/TokenModal'

interface MapPageProps {
  params: { mapUuid: string }
}

export default function MapPage({ params }: MapPageProps) {
  return (
    <TokenProvider mapUuid={params.mapUuid}>
      <Navbar>
        <NavbarContent>
          <Bench />
        </NavbarContent>
        <NavbarContent justify="end">
          <TokenModal />
        </NavbarContent>
      </Navbar>
      <main className="p-4">
        <GridContainer>
          {/* Background layer */}
          <BackgroundLayer />

          {/* Token layer */}

          <TokenLayer />
        </GridContainer>
      </main>
    </TokenProvider>
  )
}
