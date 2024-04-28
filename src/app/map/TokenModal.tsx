import { useContext, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { TokenContext } from '@/map/TokenContext'

export default function TokenModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const { createToken } = useContext(TokenContext)

  function add() {
    createToken({
      name,
      img_url: imgUrl,
    })
    onClose()
  }

  return (
    <>
      <Button onPress={onOpen}>Add Token</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="">Add Token</ModalHeader>
          <ModalBody>
            <Input label="Name" value={name} onValueChange={setName} />
            <Input label="Image URL" value={imgUrl} onValueChange={setImgUrl} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={add}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
