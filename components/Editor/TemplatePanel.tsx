import { motion } from 'framer-motion'
import { snappy } from '../../static/transitions'
import { Button } from './Button'
import styled from 'styled-components'
import { Droplet, Copy } from '../Icons'
import { ButtonStack } from './Drawer'

export const TemplatePanel = ({ close, onModify = () => { } }) => {
  const templates = [
    { name: 'Classy design.fig', hash: 'sfaksmödlfkmasöld' },
    { name: 'My very pretty design.fig', hash: 'sfaksmödlfkmasöld' },
    { name: 'West coast customs.fig', hash: 'sfaksmödlfkmasöld' },
  ]

  const animations = {
    variants: {
      hidden: { scale: 1, y: -25, opacity: 0 },
      revealed: { scale: 1, y: 0, opacity: 1 }
    },
    transition: { ...snappy, opacity: { duration: 0.2 } }
  }

  return (
    <>
      <ul>
        {templates.map(({ name, hash }, i) =>
          <Item {...animations} key={i}>
            <Button width="100%">
              <Droplet />
              <div>
                <span>{name}</span><i>– Duplicate template</i>
              </div>
              <a
                //href={`https://www.google.com/search?q=${hash}`}
                //target="_blank"
                onClick={onModify}><Copy /></a>
            </Button>
          </Item>
        )}
      </ul>
      <ButtonStack {...animations}>
        <Button onClick={close}>
          Close
        </Button>
        <Button onClick={close}>
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
    > div {
      flex: 1;
      display: flex;
      white-space: nowrap;
      width: calc(100% - 112px);
      > span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i {
        display: none;
        opacity: 0.5;
        padding-left: 3px;
      }
    }
    &:hover > div > i {
      //display: inline;
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
    svg:hover ~ div > i {
      display: block;
    }
    a {
      display: none;
      height: 100%;
      display: flex;
      align-items: center;
    }
    &:hover > a {
      display: block;
    }
  }
`