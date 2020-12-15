import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDrawer } from './DrawerContext'
import styled from 'styled-components'

export const Dropdown = () => {
  const { dropdownTarget, setDropdownTarget, removeTemplate, setPanel, selectedTemplate } = useDrawer()

  const handleCloseMenu = () => {
    setDropdownTarget(null);
  };

  const handleDuplicate = () => {
    const url = `https://www.figma.com/file/${selectedTemplate.template}/duplicate`
    window.open(url, '_blank')
    setPanel('addtemplate')
    setDropdownTarget(null);
  }

  return (
    <StyledMenu
      elevation={0}
      anchorEl={dropdownTarget}
      open={Boolean(dropdownTarget)}
      onClose={handleCloseMenu}
    >
      <StyledItem onClick={handleDuplicate}>Edit</StyledItem>
      <StyledItem
        disabled={Boolean(!selectedTemplate?.dateAdded)}
        onClick={() => {
          removeTemplate()
          setDropdownTarget(null)
        }}>
        Remove
      </StyledItem>
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .MuiList-root {
    min-width: 100px;
    background: #3D4148;
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
`;