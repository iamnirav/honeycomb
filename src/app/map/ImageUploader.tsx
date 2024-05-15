import { ReactNode, useRef } from 'react'
import { Button } from '@nextui-org/react'
import db from '@/db'

export default function ImageUploader() {
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: any) {
    const { data, error } = await db.storage
      .from('token-images')
      .upload('file_path', file)
    if (error) {
      // Handle error
    } else {
      // Handle success
    }
  }

  return (
    <div>
      <Button
        onPress={() => {
          inputRef.current?.click()
        }}
      >
        Upload image or drag here
      </Button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" />
    </div>
  )
}
