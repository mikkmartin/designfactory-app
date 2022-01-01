import styled from 'styled-components'
import { Fields } from './Fields'
import { observer } from 'mobx-react-lite'
//import { useForm } from './FormContext'

export const Inputs = observer(() => {
  //const { editing, setEditing, schema } = useForm()

  return (
    <Container>
      <div className="header">
        {/*
          <h4>{schema.title}</h4>
          <button onClick={() => setEditing(!editing)}>{!editing ? 'Edit' : 'Done'}</button>
          <p>{schema.description}</p>
        */}
      </div>
      <Fields />
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
