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

interface TokenModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  token?: { name: string; imgUrl: string }
}

export default function TokenModal({
  isOpen,
  onOpenChange,
  onClose,
  token,
}: TokenModalProps) {
  const [form, setForm] = useState(token || { name: '', imgUrl: '' })

  const { createToken } = useContext(TokenContext)

  function add() {
    const { name, imgUrl } = form
    createToken({
      name,
      imgUrl,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="">Add Token</ModalHeader>
        <ModalBody>
          <Input
            label="Name"
            value={form.name}
            onValueChange={(name) => setForm({ ...form, name })}
          />
          <Input
            label="Image URL"
            value={form.imgUrl}
            onValueChange={(imgUrl) => setForm({ ...form, imgUrl })}
          />
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
  )
}
