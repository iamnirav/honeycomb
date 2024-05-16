import { ReactNode, useContext } from 'react'
import clsx from 'clsx'
import { Token } from '@/types'
import Layer from './Layer'
import { TokenContext } from './TokenContext'
import TokenView from './TokenView'

interface TokenLayerProps {
  isFocused: boolean
}

export default function TokenLayer({ isFocused }: TokenLayerProps) {
  const { tokens } = useContext(TokenContext)

  const contents: ReactNode[][] = tokens.reduce(
    (acc: ReactNode[][], token: Token) => {
      if (token.x !== null && token.y !== null) {
        if (!acc[token.x]) acc[token.x] = []
        acc[token.x][token.y] = (
          <div className="absolute">
            <TokenView token={token} />
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
