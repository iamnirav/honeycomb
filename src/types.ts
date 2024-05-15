export interface HasId {
  id: number
}

export interface HasUuid {
  uuid: string
}

export interface Coords {
  x: number | null
  y: number | null
}

export interface NewToken extends HasUuid, Coords {
  name: string
  imgUrl: string
  ring: number | null
}

export interface Token extends NewToken, HasId {}

export interface Map extends HasId, HasUuid {
  name: string
  tiles: string[][] | null
}

export function isTypeCoords(param: unknown): param is Coords {
  return (
    !!param &&
    typeof param === 'object' &&
    !Array.isArray(param) &&
    Object.hasOwn(param, 'x') &&
    Object.hasOwn(param, 'y')
  )
}

export function isTypeToken(param: unknown): param is Token {
  return (
    !!param &&
    typeof param === 'object' &&
    !Array.isArray(param) &&
    Object.hasOwn(param, 'name') &&
    Object.hasOwn(param, 'imgUrl') &&
    Object.hasOwn(param, 'ring')
  )
}
