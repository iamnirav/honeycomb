import { Button, useDisclosure } from '@nextui-org/react'
import TokenModal from '@/map/TokenModal'

export default function AddTokenButton() {
  const disclosure = useDisclosure()

  return (
    <>
      <Button onPress={disclosure.onOpen}>Add Token</Button>
      <TokenModal {...disclosure} />
    </>
  )
}
