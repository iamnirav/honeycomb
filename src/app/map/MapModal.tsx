import { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { navigate } from '@/actions'
import db from '@/db'
import localStorage from '@/localStorage'
import { Map } from '@/types'

interface MapModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  backdrop?: 'blur' | 'transparent' | 'opaque'
  hideCloseButton?: boolean
}

export default function MapModal({
  isOpen,
  onOpenChange,
  backdrop = 'blur',
  hideCloseButton = true,
}: MapModalProps) {
  const [form, setForm] = useState<{ name: string }>({ name: '' })
  const [tab, setTab] = useState('recent')
  const [selectedMaps, setSelectedMaps] = useState(new Set<string>([]))
  const [recentMaps, setRecentMaps] = useState<Map[]>([])
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState<boolean>(false)

  useEffect(() => {
    setRecentMaps(localStorage.getMaps())
  }, [])

  async function createMap() {
    const map = await db.from('maps').insert(form).select()
    if (map.data?.length && map.data[0].uuid) {
      navigate(`/map/${map.data[0].uuid}`)
    }
  }

  function openMap() {
    const mapUuids = Array.from(selectedMaps)
    if (mapUuids.length) {
      navigate(`/map/${mapUuids[0]}`)
    }
  }

  function confirmRemove() {
    const mapUuids = Array.from(selectedMaps)
    if (mapUuids.length) {
      localStorage.removeMap(mapUuids[0])
      setRecentMaps(
        recentMaps.filter((recentMap) => recentMap.uuid !== mapUuids[0]),
      )
    }
    setConfirmRemoveOpen(false)
    setSelectedMaps(new Set<string>([]))
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop={backdrop}
      hideCloseButton={hideCloseButton}
      scrollBehavior="inside"
    >
      <ModalContent className="h-96">
        <ModalHeader>
          <Tabs selectedKey={tab} onSelectionChange={setTab as any}>
            <Tab key="recent" title="Recent Maps"></Tab>
            <Tab key="new" title="New Map"></Tab>
          </Tabs>
        </ModalHeader>
        <Divider />
        <ModalBody>
          {tab === 'new' ? (
            <Input
              label="Map name"
              value={form.name}
              onValueChange={(name) => setForm({ ...form, name })}
              className="pt-2"
            />
          ) : (
            <Listbox
              aria-label="Recent maps"
              selectionMode="single"
              selectedKeys={selectedMaps as any}
              onSelectionChange={setSelectedMaps as any}
              hideSelectedIcon={true}
              shouldHighlightOnFocus={false}
              disallowEmptySelection
            >
              <ListboxSection title={'RECENTLY VISITED MAPS'}>
                {recentMaps.map((map: Map) => (
                  <ListboxItem
                    key={map.uuid}
                    title={map.name}
                    description={map.uuid}
                    className={selectedMaps.has(map.uuid) ? 'bg-gray-200' : ''}
                  />
                ))}
              </ListboxSection>
            </Listbox>
          )}
        </ModalBody>
        <Divider />
        <ModalFooter>
          {tab === 'new' ? (
            <Button color="primary" onPress={createMap}>
              Create
            </Button>
          ) : (
            <>
              <Popover
                placement="top-start"
                backdrop="blur"
                isOpen={confirmRemoveOpen}
                onOpenChange={(open) => setConfirmRemoveOpen(open)}
              >
                <PopoverTrigger>
                  <Button
                    className="mr-auto"
                    color="danger"
                    variant="light"
                    isDisabled={!selectedMaps.size}
                  >
                    Remove&hellip;
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-2">
                    <div className="mb-3 text-base">
                      Remove{' '}
                      <span className="font-bold">
                        {
                          recentMaps.find(
                            (map) => map.uuid === Array.from(selectedMaps)[0],
                          )?.name
                        }
                      </span>{' '}
                      from list?
                    </div>
                    <Button onPress={confirmRemove} color="danger">
                      Remove Map
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                color="primary"
                onPress={openMap}
                isDisabled={!selectedMaps.size}
              >
                Open
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
