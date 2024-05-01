import { useContext } from 'react'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'

export default function Bench() {
  const { tokens } = useContext(TokenContext)

  return (
    <div className="inline-flex">
      {tokens
        .filter((token: any) => token.x === null || token.y === null)
        .map((token: any) => (
          <Token
            key={token.id || token.name || token.imgUrl}
            size="sm"
            token={token}
          />
        ))}
    </div>
  )
}
