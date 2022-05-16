import { ObjectFieldTemplateProps } from '@rjsf/core'
import styled from 'styled-components'
import { motion, Reorder } from 'framer-motion'
import { FC } from 'react'

export const ObjectField = (props: ObjectFieldTemplateProps) => {
  //const {} = useForm()
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
  return <Reorder.Item value={0}>{content}</Reorder.Item>
}

const Container = styled(Reorder.Group)`
  display: grid;
  gap: 4px;
`
