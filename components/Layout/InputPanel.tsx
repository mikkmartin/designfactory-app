import styled from 'styled-components'
import { Input } from 'components/Common'
import { TextArea } from 'components/Common/TextArea'
import { Dropdown, DropdownSelector } from 'components/Common'

export const InputPanel = () => {
  return (
    <Container>
      <h4>Link image generator</h4>
      <p>
        You can download the image with the blue button on top, or you can embed the code below to
        generate it on-demand for every page on your site dynamically:
      </p>
      <Input label="Title" placeholder="What is AWS Lambda?" />
      <TextArea
        label="Description"
        placeholder="Generate beautiful, customised preview images for every page automaticall."
      />
      <Dropdown options={['lambda']} fullWidth>
        <DropdownSelector>Hello</DropdownSelector>
      </Dropdown>
    </Container>
  )
}

const Container = styled.div`
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  h4 {
    margin-bottom: 8px;
    font-weight: normal;
  }
  p {
    margin-bottom: 16px;
    opacity: 0.5;
  }
`
