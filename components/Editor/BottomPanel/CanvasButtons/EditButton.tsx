import { EditPencil } from 'components/icons'
import { store } from 'data'
import { Button, Tooltip } from 'components/ui'

export const EditButton = () => {
  const { setIsEditing } = store.ui

  const handleEdit = () => {
    //const { figmaID } = store.content.template.theme
    //const url = `https:www.figma.com/file/${figmaID}`
    //setTimeout(() => window.open(url, '_blank'))
    setIsEditing(true)
  }

  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button onClick={handleEdit}>
          <EditPencil />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>Edit design</Tooltip.Content>
    </Tooltip.Root>
  )
}
