import { Dropdown, DropdownSelector } from 'components/ui/Dropdown'
import { More } from 'components/icons'
import styled from 'styled-components'
import { useState } from 'react'
import { Select } from 'components/ui/Select'
import { nanoid } from 'nanoid'

const items = ['Edge', 'Firefox', 'Chrome', 'Opera', 'Safari'].concat(
  [...Array(10).keys()].map(i => `Item ${i}`)
)

export default function Test() {
  const [selection, setSelection] = useState('')
  const [focusEl, setFocusEl] = useState('')

  const handleSelect = selection => {
    setSelection(selection)
    setFocusEl('')
  }

  return (
    <Wrapper>
      <Dropdown options={items}>
        <DropdownSelector>Hello</DropdownSelector>
      </Dropdown>
      <Select
        items={items}
        onFocus={setFocusEl}
        onBlur={() => setFocusEl('')}
        onValueChange={handleSelect}
      />
      <Select
        items={items}
        onFocus={setFocusEl}
        onBlur={() => setFocusEl('')}
        onValueChange={handleSelect}>
        <More />
      </Select>
      <code style={{ width: 400 }}>
        <pre>{JSON.stringify({ selection, focusEl }, null, 2)}</pre>
      </code>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  place-items: center;
  justify-content: space-around;
  min-height: 100vh;
  min-width: 100vh;
  background: rgb(40, 44, 52);
`
