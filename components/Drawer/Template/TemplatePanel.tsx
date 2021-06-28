import { motion, AnimateSharedLayout } from 'framer-motion'
import { Button } from '../../Common/Button'
import styled from 'styled-components'
import { More } from '../../Icons'
import { ButtonStack, childAnimations } from '../Tab'
import { useEditor } from '../../Editor'
import { defaults } from 'static/invoice'
import { snappy } from 'static/transitions'
import { Check } from "../../Common/Check";
import { useDrawer } from "../DrawerContext";
import { Dropdown } from "../../Common/Dropdown";

export const TemplatePanel = ({ close, onModify }) => {
  const { data, setData } = useEditor()
  const { openDropdown, templates } = useDrawer()
  const currentTemplate = data.template || defaults.template

  const onSelect = (ev, { template, fonts }) => {
    ev.preventDefault()
    //if (ev.target.type === 'submit') setJson({ ...json, template })
    let newData = { ...data, template }
    if (fonts) newData.fonts = fonts
    else delete newData.fonts
    setData(newData)
  }

  return (
    <Container>
      <List>
        <AnimateSharedLayout>
          {templates.map((templateObject) => {
            const { template, name, fonts } = templateObject
            const selected = template === currentTemplate
            return (
              <Item layout {...childAnimations} key={template}>
                {selected && <motion.div layoutId="highlight" className="highlight" transition={snappy} />}
                <Button
                  width="100%"
                  noHover={selected}
                  onClick={(ev) => onSelect(ev, { template, fonts })}
                >
                  <Check checked={selected} />
                  <div className="text">
                    <span>{name}</span>
                  </div>
                  <a href="0" onClick={ev => openDropdown(ev, templateObject)}>
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
      <Dropdown />
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