import { Key } from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react'
import MapModal from './MapModal'

interface MenuProps {
  layer: 'token' | 'tile'
  setLayer: Function
}

export function Menu({ layer, setLayer }: MenuProps) {
  const disclosure = useDisclosure()

  function handleAction(key: Key) {
    switch (key) {
      case 'maps':
        disclosure.onOpen()
        break
      case 'token':
      case 'tile':
        setLayer(key)
    }
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button>Menu</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Menu for options and settings"
          onAction={handleAction}
          selectionMode="single"
          selectedKeys={new Set([layer])}
        >
          <DropdownSection title="LAYERS" showDivider>
            <DropdownItem key="token">Token</DropdownItem>
            <DropdownItem key="tile">Tile</DropdownItem>
          </DropdownSection>
          <DropdownItem key="maps">Maps&hellip;</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <MapModal {...disclosure} />
    </>
  )
}
