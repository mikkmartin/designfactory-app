import { motion, AnimateSharedLayout } from 'framer-motion'
import { Button } from '../../ui/Button'
import styled from 'styled-components'
import { More } from '../../Icons'
import { ButtonStack, childAnimations } from '../Tab'
import { store } from 'data'
import { snappy } from 'lib/static/transitions'
import { Check } from '../../ui/Check'
import { Dropdown } from '../../ui/Dropdown_old'
import { useRouter } from 'next/dist/client/router'

export const TemplatePanel = ({ close, onModify }) => {
  const { templates, openDropDown } = store.pages
  const router = useRouter()

  return (
    <Container>
      <List>
        <AnimateSharedLayout>
          {templates.map(item => {
            const { slug, title } = item
            const selected = false
            return (
              <Item layout {...childAnimations} key={slug}>
                {selected && (
                  <motion.div layoutId="highlight" className="highlight" transition={snappy} />
                )}
                <Button width="100%" onClick={() => router.push(slug)} noHover={selected}>
                  <Check checked={selected} />
                  <div className="text">
                    <span>{title}</span>
                  </div>
                  <a href="#" onClick={ev => openDropDown(ev, item)}>
                    <More />
                  </a>
                </Button>
              </Item>
            )
          })}
        </AnimateSharedLayout>
      </List>
      <ButtonStack>
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
      &:hover {
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
