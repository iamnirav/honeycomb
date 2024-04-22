import { PropsWithChildren } from "react"

type GridContainerProps = {}

export default function GridContainer({ children } : PropsWithChildren<GridContainerProps>) {
  return (
    // `grid` class from Tailwind, unrelated to component name
    <div className="grid">
      {children}
    </div>
  )
}
