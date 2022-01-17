import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Logo, Chevron, More, Checkbox, Plus } from 'components/Icons'
import { Button } from 'components/ui'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

type Value = { value: string; label: string }
type Props = {
  value: Value
  onChange: (value: string) => void
  onAdd: () => void
  onDuplicate: () => void
  onRemove: () => void
  options: Value[]
}

export const Drawer = observer<Props>(({ value: selected, options, onChange, onAdd }) => {
  return (
    <DropdownMenu.Root>
      <Container asChild>
        <Button highlight>
          <Logo />
          <div className="text">
            <small>DesignFactory.app</small>
            <h4>{selected.label}</h4>
          </div>
          <Chevron />
        </Button>
      </Container>
      <Content loop>
        <div className="items">
          {options.map(({ label, value }) => (
            <DropdownMenu.Item asChild>
              <Item onClick={() => onChange(value)}>
                {selected.value === value ? <Checkbox /> : <svg />}
                <span>{label}</span>
                <More />
              </Item>
            </DropdownMenu.Item>
          ))}
        </div>
        <div className="footer">
          <DropdownMenu.Item asChild disabled>
            <Item className="add" highlight disabled onClick={onAdd}>
              <Plus />
              <span>Add template</span>
              <Chevron dir="right" />
            </Item>
          </DropdownMenu.Item>
        </div>
      </Content>
    </DropdownMenu.Root>
  )
})

const Container = styled(DropdownMenu.Trigger)`
  height: 64px;
  width: 100%;
  border-radius: 0;
  position: relative;
  padding: 0;
  padding-right: 8px;
  cursor: pointer;
  > svg:first-child {
    height: 80%;
    width: 56px;
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    small {
      font-size: 11px;
      opacity: 0.5;
      letter-spacing: 0.25px;
    }
    h4 {
      font-weight: 200;
      flex: 1;
      margin: 0;
      padding: 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  > svg:last-child {
    width: 40px;
    opacity: 0.5;
    stroke-width: 1.5px;
  }
  :hover > svg:last-child {
    opacity: 1;
  }
`

const Content = styled(DropdownMenu.Content)`
  height: 232px;
  width: 380px;
  overflow: auto;
  background: #32363e;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  .items {
    height: 100%;
  }
  .footer {
    height: 48px;
    background: var(--background);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    position: sticky;
    bottom: 0;
  }
`

const Item = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 0;
  position: relative;
  box-shadow: unset;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  font-size: 11px;
  svg {
    width: 40px;
    height: 18px;
    stroke-width: 1.75px;
  }
  svg:last-child {
    opacity: 0.25;
  }
  span {
    flex: 1;
    text-align: left;
    margin-left: 8px;
  }
  :not(:last-child, &:hover) {
    &:after {
      content: '';
      position: absolute;
      display: block;
      bottom: 0;
      right: 0;
      width: calc(100% - 55px);
      height: 1px;
      background: rgba(255, 255, 255, 0.05);
    }
  }
  &.add {
    height: 100%;
  }
`
