import { ReactNode, useContext } from 'react'
import Layer from '@/map/Layer'
import Token from '@/map/Token'
import { TokenContext } from '@/map/TokenContext'
import { DEFAULT_NUM_COLS, DEFAULT_NUM_ROWS } from '../../constants'

export default function TokenLayer() {
  const { tokens } = useContext(TokenContext)

  console.log(tokens)

  const contentsMap: ReactNode[][] = tokens.reduce(
    (
      acc: ReactNode[][],
      token: { x: number; y: number; imgUrl: string; name: string },
    ) => {
      if (token.x !== null && token.y !== null) {
        acc[token.x][token.y] = <Token token={token} />
      }

      return acc
    },
    Array.from({ length: DEFAULT_NUM_COLS }, () =>
      Array(DEFAULT_NUM_ROWS).fill(undefined),
    ),
  )

  return (
    <Layer
      className="TokenLayer"
      contentsMap={contentsMap}
      isDroppable={true}
    />
  )
}
