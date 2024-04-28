import { useContext } from 'react'
import { Avatar, AvatarGroup } from '@nextui-org/react'
import { TokenContext } from '@/map/TokenContext'

export default function Bench() {
  const { tokens } = useContext(TokenContext)

  return (
    <AvatarGroup>
      {tokens
        .filter((token: any) => token.x === null || token.y === null)
        .map((token: any) => (
          <Avatar key={token.id} isBordered src={token.img_url} />
        ))}
    </AvatarGroup>
  )
}
