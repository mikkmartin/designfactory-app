import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
//import { useCanvas } from '../store/CanvasProvider'
//import { useEditor } from 'components/Editor'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const Box = observer<any>(({ children, ...props }) => {
  let overrideUrl = null
  const [isLoading, setIsLoading] = useState(false)
  const { data } = store.editorStore
  //const { editable } = useCanvas()
  //const { data } = useEditor()

  if (props.style.background.includes('url')) {
    const override = Object.entries(data).find(([key]) => key === props.name)
    if (override) {
      const overrideValue = override[1]
      if (typeof overrideValue === 'string' && overrideValue.length > 0) {
        props.style.background = `url(${overrideValue}) center center / cover no-repeat`
      }
    }
  }

  useEffect(() => {
    if (!overrideUrl) return
    try {
      setIsLoading(true)
      const imageLoader = new Image()
      imageLoader.src = overrideUrl
      imageLoader.onload = () => {
        props.style.background = `url(${overrideUrl}) center center / cover no-repeat`
        setIsLoading(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [overrideUrl])

  return (
    <Container hasOverRide={isLoading} {...props}>
      {children}
    </Container>
  )
})

const Container = styled.div<{ hasOverRide: boolean }>`
  position: relative;
  ${p =>
    p.hasOverRide &&
    css`
      &::before {
        content: '';
        position: absolute;
        backdrop-filter: blur(5px);
        width: 100%;
        height: 100%;
      }
      &::after {
        content: '';
        background: #ffff00c5;
        position: absolute;
        width: 150%;
        left: -25%;
        top: 48%;
        height: 2%;
        transform: rotate(45deg);
        animation: reflect 0.5s linear infinite;
      }
      @keyframes reflect {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(180deg);
        }
      }
    `}
`
