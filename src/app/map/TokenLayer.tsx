import { ReactNode, useContext } from 'react'
import clsx from 'clsx'
import Layer from './Layer'
import { TokenContext } from './TokenContext'
import Token from './TokenView'

interface TokenLayerProps {
  isFocused: boolean
}

export default function TokenLayer({ isFocused }: TokenLayerProps) {
  const { tokens } = useContext(TokenContext)

  const contents: ReactNode[][] = tokens.reduce(
    (
      acc: ReactNode[][],
      token: { x: number; y: number; imgUrl: string; name: string },
    ) => {
      if (token.x !== null && token.y !== null) {
        if (!acc[token.x]) acc[token.x] = []
        acc[token.x][token.y] = (
          <div className="absolute">
            <Token token={token} />
          </div>
        )
      }

      return acc
    },
    [],
  )

  return (
    <Layer
      className={clsx('TokenLayer', {
        'pointer-events-none opacity-50': !isFocused,
      })}
      contents={contents}
      isDroppable={true}
    />
  )
}
