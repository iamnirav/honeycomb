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
import { GearSix, Hexagon, LegoSmiley, MapTrifold } from '@phosphor-icons/react'
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
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button isIconOnly>
            <GearSix size={30} weight="duotone" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Menu for options and settings"
          onAction={handleAction}
          selectionMode="single"
          selectedKeys={new Set([layer])}
        >
          <DropdownSection title="LAYERS" showDivider>
            <DropdownItem
              key="token"
              startContent={<LegoSmiley size={20} weight="duotone" />}
            >
              Token
            </DropdownItem>
            <DropdownItem
              key="tile"
              startContent={<Hexagon size={20} weight="duotone" />}
            >
              Tile
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key="maps"
            startContent={<MapTrifold size={20} weight="duotone" />}
          >
            Maps&hellip;
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <MapModal {...disclosure} />
    </>
  )
}
