import { Button, ButtonGroup } from '@nextui-org/react'
import { PaintBrush } from '@phosphor-icons/react'

const BACKGROUND_COLORS = [
  'rgb(115 115 115)',
  'rgb(34 197 94)',
  'rgb(234 179 8)',
  'rgb(59 130 246)',
] as const

export type BackgroundColor = (typeof BACKGROUND_COLORS)[number]

interface PaletteProps {
  brush?: BackgroundColor
  setBrush: Function
}

export default function Palette({ brush, setBrush }: PaletteProps) {
  return (
    <ButtonGroup variant="bordered" radius="full">
      {BACKGROUND_COLORS.map((COLOR) => (
        <Button
          key={COLOR}
          isIconOnly={true}
          style={{ backgroundColor: COLOR }}
          onPress={() => setBrush(COLOR === brush ? undefined : COLOR)}
        >
          {COLOR === brush ? (
            <PaintBrush size={18} color="white" weight="duotone" />
          ) : (
            ''
          )}
        </Button>
      ))}
    </ButtonGroup>
  )
}
