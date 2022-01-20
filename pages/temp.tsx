import styled from 'styled-components'
import { Form } from 'components/Editor/Form'
import { getSchemas, Schemas } from 'components/Canvas/parseTemplate/getSchemas'
import type { UiSchema } from '@rjsf/core'
import invoiceSchema from 'lib/static/invoiceSchema.json'
//import { JSONSchema7Object } from 'json-schema'
import storageUrl from 'lib/static/storageURL'
import { useMemo, useState } from 'react'
import { Button, Toggle } from 'components/ui'

const Temp = () => {
  const [editing, setEditing] = useState(false)
  const [toggle, setToggle] = useState(true)

  const { schema: _schema, uiSchema: _uiSchema } = useFetchParsedSchema()

  const [uiSchemaInvoice, setUiSchema] = useState<UiSchema>({})
  const [value, setValue] = useState({})
  const schema = toggle ? _schema : invoiceSchema
  const uiSchema = toggle ? _uiSchema : uiSchemaInvoice

  return (
    <>
      <Container>
        <Button highlight onClick={() => setEditing(!editing)}>
          {editing ? 'Done' : 'Edit'}
        </Button>
        <Toggle value={toggle} onValueChange={setToggle} />
        {schema && (
          <Form
            editing={editing}
            onUiSchemaChange={setUiSchema}
            schema={toggle ? schema : invoiceSchema}
            uiSchema={uiSchema}
            onValueChange={setValue}
          />
        )}
        <pre>
          <p>Value:</p>
          {JSON.stringify(value, null, 2)}
          <p>Schema:</p>
          {JSON.stringify(schema, null, 2)}
          <p>Ui schema:</p>
          {JSON.stringify(uiSchema, null, 2)}
        </pre>
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
    font-family: inherit;
    line-height: 1.5;
    font-size: 11px;
    p {
      opacity: 0.5;
    }
  }
  .unsupported-field {
    max-width: 100%;
    overflow: auto;
  }
`

const useFetchParsedSchema = () => {
  const [schemas, setSchemas] = useState<Schemas>(null)

  useMemo(getJson, [])
  async function getJson() {
    //const res = await fetch(storageUrl + '/themes/files/notion-blog-og-hn8ck.json')
    //const res = await fetch(storageUrl + '/themes/files/og-image-test-dr9k3.json')
    const res = await fetch(storageUrl + '/themes/files/invoice.json')
    const json = await res.json()
    setSchemas(getSchemas(json))
  }

  return {
    schema: schemas?.schema,
    uiSchema: schemas?.uiSchema,
  }
}

export default Temp
