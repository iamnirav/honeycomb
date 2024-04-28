'use client'

import BackgroundLayer from '@/map/BackgroundLayer'
import GridContainer from '@/map/GridContainer'
import { TokenProvider } from '@/map/TokenContext'
import TokenLayer from '@/map/TokenLayer'

interface MapPageProps {
  params: { mapId: string }
}

export default function MapPage({ params }: MapPageProps) {
  return (
    <main className="p-4">
      <GridContainer>
        {/* Background layer */}
        <BackgroundLayer />

        {/* Token layer */}

        <TokenProvider mapId={params.mapId}>
          <TokenLayer />
        </TokenProvider>
      </GridContainer>
    </main>
  )
}
