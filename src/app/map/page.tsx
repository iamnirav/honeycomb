import GridContainer from '@/app/map/GridContainer'
import TokenLayer from '@/app/map/TokenLayer'

export default function Map() {
  return (
    <main className="p-4">
      <GridContainer>
        {/* Token layer */}
        <TokenLayer />

        {/* Background layer */}
      </GridContainer>
      
    </main>
  )
}
