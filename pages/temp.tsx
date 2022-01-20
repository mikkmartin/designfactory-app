import styled from 'styled-components'
import { Form } from 'components/Editor/Form'
import invoiceSchema from 'lib/static/invoiceSchema.json'
import { getSchemas } from 'components/Canvas/parseTemplate/getSchemas'
import type { UiSchema } from '@rjsf/core'
//import { JSONSchema7Object } from 'json-schema'
import storageUrl from 'lib/static/storageURL'
import { useMemo, useState } from 'react'
import { Button } from 'components/ui'

const Temp = () => {
  const [editing, setEditing] = useState(false)

  //const json = useParsedSchema()

  const [uiSchema, setUiSchema] = useState<UiSchema>({})
  const [value, setValue] = useState({})

  return (
    <>
      <Button onClick={() => setEditing(!editing)}>{editing ? 'Done' : 'Edit'}</Button>
      <Container>
        <Form
          editing={editing}
          onUiSchemaChange={setUiSchema}
          schema={invoiceSchema}
          uiSchema={uiSchema}
          onValueChange={setValue}
        />
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 380px 380px;
  gap: 16px;
  margin: 4rem;
  pre {
    opacity: 0.5;
    font-family: inherit;
    line-height: 1.5;
    font-size: 11px;
  }
  .unsupported-field {
    max-width: 100%;
    overflow: auto;
  }
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
