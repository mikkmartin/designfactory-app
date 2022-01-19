import styled from 'styled-components'
import { Form } from 'components/Editor/Form'
import invoiceSchema from 'lib/static/invoiceSchema.json'
import { getSchemas } from 'components/Canvas/parseTemplate/getSchemas'
import storageUrl from 'lib/static/storageURL'
import { useMemo, useState } from 'react'

const Temp = () => {
  //const json = useParsedSchema()
  return (
    <Container>
      <Form schema={invoiceSchema} uiSchema={{}} value={{}} />
      <Outline />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 380px 380px;
  gap: 16px;
  margin: 4rem;
  > * {
    grid-area: 1 / 1;
  }
`

const Outline = styled.div`
  border: 1px solid #ffffff1c;
  padding: 16px;
`

const useParsedSchema = () => {
  const [schema, setSchema] = useState(null)
  useMemo(() => getJson(), [])

  async function getJson() {
    const res = await fetch(storageUrl + '/themes/files/invoice.json')
    const json = await res.json()
    const schemas = getSchemas(json)
    setSchema(schemas)
  }

  return schema
}

export default Temp
