import { useContext, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
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

  useEffect(() => {
    if (token) {
      setForm(token)
    }
  }, [token, isOpen])

  const { insertToken, updateToken, deleteToken } = useContext(TokenContext)

  function save() {
    if (!token) {
      insertToken({ ...form })
    } else {
      updateToken({ ...form })
    }
    onClose()
  }

  function confirmDelete() {
    onClose()
    deleteToken(token)
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        <ModalHeader className="">{!!token ? 'Edit' : 'Add'} Token</ModalHeader>
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
          {!!token && (
            <Popover placement="top-start" showArrow={false} backdrop="blur">
              <PopoverTrigger>
                <Button className="mr-auto" color="danger" variant="light">
                  Delete&hellip;
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-2">
                  <div className="mb-3 font-bold">Delete {form.name}?</div>
                  <Button onPress={confirmDelete} color="danger">
                    Delete Token
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <Button onPress={onClose}>Cancel</Button>
          <Button color="primary" onPress={save}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
