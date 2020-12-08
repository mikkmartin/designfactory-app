import { useState } from "react";
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDrawer } from "./DrawerContext";

export const Dropdown = () => {
  const { dropdownTarget, setDropdownTarget, removeTemplate, setPanel, selectedTemplate } = useDrawer()

  const handleCloseMenu = () => {
    //setSelectedTemplate(null)
    setDropdownTarget(null);
  };

  const handleDuplicate = () => {
    setPanel('addtemplate')
    setDropdownTarget(null);
  }

  return (
    <Menu
      anchorEl={dropdownTarget}
      open={Boolean(dropdownTarget)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={handleDuplicate}>Edit</MenuItem>
      <MenuItem
        disabled={Boolean(!selectedTemplate?.dateAdded)}
        onClick={() => {
          removeTemplate()
          setDropdownTarget(null)
        }}>
        Remove
      </MenuItem>
    </Menu>
  )
}