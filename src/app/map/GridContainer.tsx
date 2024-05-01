import { PropsWithChildren } from 'react'

export default function GridContainer({ children }: PropsWithChildren) {
  return (
    // `grid` class from Tailwind, unrelated to component name
    <div className="grid">{children}</div>
  )
}
