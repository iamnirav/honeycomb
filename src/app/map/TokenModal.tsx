import { useContext, useEffect, useState } from 'react'
import {
  Avatar,
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
} from '@nextui-org/react'
import clsx from 'clsx'
import { COLOR_CODES, getColor, isOnlyEmoji, shortenName } from '@/helpers'
import { Token } from '@/types'
import { TokenContext } from './TokenContext'

// import ImageUploader from './ImageUploader'

interface TokenModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  token?: Token
}

export default function TokenModal({
  isOpen,
  onOpenChange,
  onClose,
  token,
}: TokenModalProps) {
  const { insertToken, updateToken, deleteToken, newToken, setNewTokenCoords } =
    useContext(TokenContext)

  const [form, setForm] = useState(token || newToken)

  useEffect(() => {
    if (isOpen) {
      setForm(token || { ...newToken, uuid: crypto.randomUUID() })
    }
  }, [token, newToken, isOpen])

  function save() {
    if (!token) {
      insertToken({ ...form })
      setNewTokenCoords({ x: null, y: null }) // clear coordinates from a drag/drop token creation
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
          {/* TODO rate limit requests based on typing in the image url field */}
          <Input
            label="Image URL"
            value={form.imgUrl}
            onValueChange={(imgUrl) => setForm({ ...form, imgUrl })}
          />
          <div className="flex gap-4 my-4 items-center justify-center">
            {COLOR_CODES.map((code) => {
              return (
                <Avatar
                  isBordered
                  isDisabled={form.ring !== code && !(!code && !form.ring)}
                  color={getColor(code)}
                  src={form.imgUrl}
                  key={code}
                  onClick={() => setForm({ ...form, ring: code })}
                  name={form.name}
                  getInitials={shortenName}
                  className={clsx(
                    {
                      'text-2xl':
                        form.name && isOnlyEmoji(form.name.split(' ')[0]),
                    },
                    'cursor-pointer',
                  )}
                />
              )
            })}
          </div>
          {/* <ImageUploader /> */}
        </ModalBody>
        <ModalFooter>
          {!!token && (
            <Popover placement="top-start" backdrop="blur">
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
