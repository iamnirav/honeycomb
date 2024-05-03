import { Avatar, Button, useDisclosure } from '@nextui-org/react'
import TokenModal from '@/map/TokenModal'

export default function AddTokenButton() {
  const disclosure = useDisclosure()

  return (
    <>
      <Avatar
        isBordered
        size="sm"
        onClick={disclosure.onOpen}
        name="&hellip;"
        className="ml-4 cursor-pointer"
      />
      <TokenModal {...disclosure} />
    </>
  )
}
