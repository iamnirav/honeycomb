'use client'

import BackgroundLayer from '@/map/BackgroundLayer'
import GridContainer from '@/map/GridContainer'
import { TokenProvider } from '@/map/TokenContext'
import TokenLayer from '@/map/TokenLayer'

export default function Map() {
  return (
    <main className="p-4">
      <GridContainer>
        {/* Background layer */}
        <BackgroundLayer />

        {/* Token layer */}

        <TokenProvider>
          <TokenLayer />
        </TokenProvider>
      </GridContainer>
    </main>
  )
}
