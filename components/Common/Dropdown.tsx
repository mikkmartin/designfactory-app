import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'
import { store } from 'data'
import { observer } from 'mobx-react-lite'

export const Dropdown = observer(() => {
  const { dropDownItem, closeDropDown, removeTempTemplate } = store.pages
  const isOpen = Boolean(dropDownItem)

  const handleDuplicate = () => {
    const url = `https://www.figma.com/file/${dropDownItem.id}/duplicate`
    window.open(url, '_blank')
    //setPanel('addtemplate')
    closeDropDown()
  }

  return (
    <StyledMenu elevation={0} anchorEl={dropDownItem?.targetEl} open={isOpen} onClose={closeDropDown}>
      <StyledItem onClick={handleDuplicate}>Duplicate</StyledItem>
      <StyledItem
        disabled={true}
        onClick={() => {
          removeTempTemplate(dropDownItem.slug)
          closeDropDown()
        }}>
        Remove
      </StyledItem>
    </StyledMenu>
  )
})

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .MuiList-root {
    min-width: 100px;
    background: #3d4148;
  }
  .MuiListItem-root.Mui-disabled {
    opacity: 0.3 !important;
  }
`
const StyledItem = styled(MenuItem)`
  :hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }
  color: white !important;
  font-family: inherit !important;
`
