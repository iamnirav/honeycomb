import { useContext } from 'react'
import { useDroppable } from '@dnd-kit/core'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'
import AddTokenButton from './AddTokenButton'

export default function Bench() {
  const { tokens } = useContext(TokenContext)

  const { isOver, setNodeRef } = useDroppable({
    id: 'bench',
    data: { coords: { x: null, y: null } },
  })

  let bgClass = 'bg-white/75'
  if (isOver) {
    bgClass = 'bg-white'
  }

  return (
    <div
      ref={setNodeRef}
      className={`inline-flex p-3 shadow-inner rounded-full shadow-black/25 ${bgClass}`}
    >
      {tokens
        .filter((token: any) => token.x === null || token.y === null)
        .map((token: any) => (
          <Token
            key={token.id || token.name || token.imgUrl}
            size="sm"
            token={token}
          />
        ))}
      <AddTokenButton />
    </div>
  )
}
