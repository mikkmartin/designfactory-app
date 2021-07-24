import { useRef } from 'react'
import { renderElement } from '../renderElement'
import { Box } from './Box'
import { InstanceProvider } from './InstanceContext'
import { useCanvas } from '../model/CanvasModel'
import { useEditor } from 'components/Editor'

export const InstanceContainer = ({ children, ...props }) => {
  const { componentSets } = useCanvas()
  const { data } = useEditor()
  const index = useRef(0)

  const update = obj => {
    /*
    console.log(data.items[0])
    Object.entries(obj).map(([k, v]) => {
      onDataUpdate({
        [props.name]: data[props.name].map((item, i) => {
          if (i === index.current) return { ...item, [k]: v }
          else return item
        }),
      })
    })
    */
  }

  return (
    <Box {...props}>
      {children.map((child, i) =>
        child.type === 'INSTANCE' ? (
          <InstanceProvider key={i} data={data[props.name]} update={update}>
            {renderElement(child)}
          </InstanceProvider>
        ) : (
          renderElement(child)
        )
      )}
    </Box>
  )
}
