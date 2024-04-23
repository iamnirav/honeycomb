'use client'

import { TokenContext, TokenContextMockData } from '@/app/map/TokenContext'
import GridContainer from '@/app/map/GridContainer'
import TokenLayer from '@/app/map/TokenLayer'
import BackgroundLayer from '@/app/map/BackgroundLayer'

export default function Map() {
  return (
    <main className="p-4">
      <GridContainer>
        {/* Background layer */}
        <BackgroundLayer />

        {/* Token layer */}
        <TokenContext.Provider value={TokenContextMockData}>
          <TokenLayer />
        </TokenContext.Provider>
      </GridContainer>
      
    </main>
  )
}
