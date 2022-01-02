import { ObjectFieldTemplateProps } from '@rjsf/core'
import styled from 'styled-components'

export const ObjectField = (props: ObjectFieldTemplateProps) => {
  //const {} = useForm()
  return <Container>{props.properties.map(element => element.content)}</Container>
}

const Container = styled.div`
  display: grid;
  gap: 4px;
  > .form-group:not(.field-array) {
    display: grid;
    grid-template-columns: 2fr 4fr;
    > *:last-child {
      grid-column: 2;
    }
  }
`
