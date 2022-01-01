import { ObjectFieldTemplateProps } from '@rjsf/core'
import { Reorder } from 'framer-motion'
import styled from 'styled-components'
import { useForm } from '../FormContext'

export const ObjectField = (props: ObjectFieldTemplateProps) => {
  //const {} = useForm()
  return <Container>{props.properties.map(element => element.content)}</Container>
}

const Container = styled.div`
  display: grid;
  gap: 4px;
  > .form-group:not(.field-array) {
    display: grid;
    grid-template-columns: 1fr 3fr;
    > *:last-child {
      grid-column: 2;
    }
  }
`
