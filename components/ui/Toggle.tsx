import { Group, Button } from './Radio'

export const Toggle = ({ value, onValueChange }) => {
  return (
    <Group value={value} onValueChange={onValueChange}>
      <Button value={true}>True</Button>
      <Button value={false}>False</Button>
    </Group>
  )
}
