'use client'

import { Navbar, NavbarContent } from '@nextui-org/react'
import BackgroundLayer from '@/map/BackgroundLayer'
import Bench from '@/map/Bench'
import DndProvider from '@/map/DndProvider'
import GridContainer from '@/map/GridContainer'
import { TokenProvider } from '@/map/TokenContext'
import TokenLayer from '@/map/TokenLayer'
import AddTokenButton from '../AddTokenButton'

interface MapPageProps {
  params: { mapUuid: string }
}

export default function MapPage({ params }: MapPageProps) {
  return (
    <TokenProvider mapUuid={params.mapUuid}>
      <DndProvider>
        <Navbar>
          <NavbarContent>
            <Bench />
          </NavbarContent>
        </Navbar>
        <main className="p-4 pb-8">
          <GridContainer>
            {/* Background layer */}
            <BackgroundLayer />

            {/* Token layer */}
            <TokenLayer />
          </GridContainer>
        </main>
      </DndProvider>
    </TokenProvider>
  )
}
