'use client'

import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import MapModal from '@/map/MapModal'

export default function Home() {
  return (
    <>
      <Navbar>
        <NavbarContent>
          <NavbarBrand className="font-light text-2xl tracking-tighter">
            ⬡ honeycomb
          </NavbarBrand>
        </NavbarContent>
      </Navbar>
      <main className="flex place-content-center p-24">
        <MapModal
          isOpen={true}
          onOpenChange={() => {}}
          onClose={() => {}}
          backdrop="transparent"
          hideCloseButton={true}
        />
      </main>
    </>
  )
}
