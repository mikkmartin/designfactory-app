import { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { Button } from '../Button'
import styled from 'styled-components'
import { More } from '../../Icons'
import { ButtonStack, childAnimations } from './Tab'
import { useEditor } from '../../Editor'
import { defaults } from '../../../static/invoice'
import { defaultTemplates, TemplateObject } from '../../../static/defaultTemplates'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocalStorage } from 'react-use'
import { snappy } from '../../../static/transitions'
import { Check } from "./Check";

export const TemplatePanel = ({ close, onModify }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { json, setJson } = useEditor()
  const currentTemplate = json.template || defaults.template
  const [customTemplates, setCustomTemplates] = useLocalStorage<TemplateObject[]>('designTemplates')
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateObject | null>(null)
  const templates: TemplateObject[] = [
    ...customTemplates,
    ...defaultTemplates
  ]

  const onSelect = (ev, template) => {
    ev.preventDefault()
    //if (ev.target.type === 'submit') setJson({ ...json, template })
    setJson({ ...json, template })
  }

  const handleOpenMenu = (ev: React.MouseEvent<HTMLAnchorElement>, template: TemplateObject) => {
    setSelectedTemplate(template)
    setAnchorEl(ev.currentTarget);
  }

  const handleCloseMenu = () => {
    setSelectedTemplate(null)
    setAnchorEl(null);
  };

  const handleDuplicate = () => {
    onModify()
    setAnchorEl(null);
  }

  const handleRemove = () => {
    setCustomTemplates([...customTemplates.filter(t => t !== selectedTemplate)])
    handleCloseMenu()
  }

  return (
    <Container>
      <List>
        <AnimateSharedLayout>
          {templates.map((templateObject, i) => {
            const { template, name } = templateObject
            const selected = template === currentTemplate
            return (
              <Item layout {...childAnimations} key={template}>
                {selected && <motion.div layoutId="highlight" className="highlight" transition={snappy} />}
                <Button
                  width="100%"
                  noHover={selected}
                  onClick={(ev) => onSelect(ev, template)}
                >
                  <Check checked={selected} />
                  <div className="text">
                    <span>{name}</span>
                  </div>
                  <a href="0" onClick={ev => handleOpenMenu(ev, templateObject)}>
                    <More />
                  </a>
                </Button>
              </Item>
            )
          })}
        </AnimateSharedLayout>
      </List>
      <ButtonStack {...childAnimations}>
        <Button highlight onClick={close}>
          Close
        </Button>
        <Button highlight onClick={onModify}>
          Add template
        </Button>
      </ButtonStack>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDuplicate}>Edit</MenuItem>
        <MenuItem disabled={Boolean(!selectedTemplate?.dateAdded)} onClick={handleRemove}>Remove</MenuItem>
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  height: 256px;
`
const List = styled.ul`
  overflow: auto;
  height: 200px;
`
const Item = styled(motion.li)`
  list-style-type: none;
  position: relative;

  .highlight {
    background: rgba(255, 255, 255, 0.1);
    position: absolute;
    width: 100%;
    height: 100%;
  }
  button {
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    font-family: inherit;
    .text {
      flex: 1;
      text-align: left;
    }
    a {
      display: flex;
      height: 100%;
      align-items: center;
      color: white;
      opacity: 0.35;
      cursor: pointer;
    }
    &:hover a {
      &:hover{
        background: rgba(255, 255, 255, 0.05);
        opacity: 1;
      }
    }
    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      right: 0;
      width: calc(100% - 56px);
      height: 1px;
      background: var(--border, rgba(255, 255, 255, 0.05));
    }
    svg {
      width: 56px;
    }
  }
`