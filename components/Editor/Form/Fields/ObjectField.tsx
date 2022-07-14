import { ObjectFieldTemplateProps } from '@rjsf/core'
import styled from '@emotion/styled'
import { Reorder } from 'framer-motion'
import { FC } from 'react'
import { useForm } from '../FormContext'

export const ObjectField = (props: ObjectFieldTemplateProps) => {
  return (
    <Container axis="y" values={[0]} onReorder={console.log}>
      {props.properties
        .filter(el => !el.hidden)
        .map((el, key) => (
          <Item {...el} key={key} />
        ))}
    </Container>
  )
}

const Item: FC<ObjectFieldTemplateProps['properties'][0]> = ({ content }) => {
  const { editing } = useForm()
  return (
    <Reorder.Item drag={editing ? false : false} value={0}>
      {content}
    </Reorder.Item>
  )
}

const Container = styled(Reorder.Group)`
  display: grid;
  gap: 4px;
`
