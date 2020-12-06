import { motion } from 'framer-motion'
import { Button } from '../Button'
import styled from 'styled-components'
import { Droplet, Copy } from '../../Icons'
import { ButtonStack, childAnimations } from './Tab'
import { useEditor } from '../../Editor'
import { defaults } from '../../../static/invoice'

export const TemplatePanel = ({ close, onModify = () => { } }) => {
  const { json, setJson } = useEditor()
  const currentTemplate = json.template || defaults.template

  const templates = [
    { name: 'default.fig', template: defaults.template },
    { name: 'invoice-mikkmartin-v1.1.fig', template: 'QFHu9LnnywkAKOdpuTZcgE' },
    { name: 'classy-design.fig', template: '9672lt3BzKaOxtdM6yT7f0' },
  ]

  const updateTemplate = (template) => {
    console.log(json)
    console.log(template)
    setJson({ ...json, template })
  }

  return (
    <>
      <ul>
        {templates.map(({ name, template }, i) =>
          <Item {...childAnimations} key={i}>
            <Button width="100%"
              highlight={template === currentTemplate}
              onClick={() => updateTemplate(template)}>
              <Droplet />
              <a
                //href={`https://www.google.com/search?q=${template}`}
                //target="_blank"
                onClick={onModify}><Copy /></a>
              <div>
                <span>{name}</span><i>– Duplicate template</i>
              </div>
            </Button>
          </Item>
        )}
      </ul>
      <ButtonStack {...childAnimations}>
        <Button highlight onClick={close}>
          Close
        </Button>
        <Button highlight onClick={close}>
          Add template
        </Button>
      </ButtonStack>
    </>
  )
}

const Item = styled(motion.li)`
  list-style-type: none;
  button {
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    font-family: inherit;
    a {
      display: flex;
      height: 100%;
      align-items: center;
      opacity: 0;
      order: 3;
      cursor: pointer;
    }
    div > i {
      display: none;
      opacity: 0.35;
      padding-left: 3px;
      padding-right: 12px;
    }
    &:hover a {
      opacity: 0.35;
      &:hover{
        opacity: 1;
        background: rgba(255, 255, 255, 0.05);
        ~ div i {
        display: inline-block;
        }
      }
    }
    > div {
      flex: 1;
      display: flex;
      white-space: nowrap;
      width: calc(100% - 112px);
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
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