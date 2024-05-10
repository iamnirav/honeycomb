import { Button, ButtonGroup } from '@nextui-org/react'

const BACKGROUND_COLORS = {
  gray: 'rgb(115 115 115)',
  green: 'rgb(34 197 94)',
  yellow: 'rgb(234 179 8)',
  blue: 'rgb(59 130 246)',
}

export type BackgroundColor = 'gray' | 'green' | 'yellow' | 'blue' | null

export default function Palette({
  brush,
  setBrush,
}: {
  brush: BackgroundColor
  setBrush: Function
}) {
  return (
    <ButtonGroup variant="bordered" radius="full">
      {Object.entries(BACKGROUND_COLORS).map(([key, value]) => (
        <Button
          key={key}
          isIconOnly={true}
          style={{ backgroundColor: value }}
          onPress={() => setBrush(key === brush ? '' : key)}
        >
          {key === brush ? '✎' : ''}
        </Button>
      ))}
    </ButtonGroup>
  )
}
