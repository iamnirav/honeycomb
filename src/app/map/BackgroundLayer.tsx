import clsx from 'clsx'
import { HexStyle } from './Hex'
import Layer from './Layer'

const styles: HexStyle[][] = []
styles[10] = []
styles[10][10] = {
  top: { borderBottomColor: 'rgb(34 197 94)' },
  middle: { backgroundColor: 'rgb(34 197 94)' },
  bottom: { borderTopColor: 'rgb(34 197 94)' },
}

export default function BackgroundLayer({ isFocused }: { isFocused: boolean }) {
  return <Layer styles={styles} className={clsx('BackgroundLayer')} />
}
