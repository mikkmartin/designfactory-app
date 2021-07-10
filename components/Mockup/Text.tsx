import { useLayoutEffect, useRef, useState } from 'react'

export const Text = ({ children }) => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 50 })
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const { width, height } = ref.current.querySelector('text').getBBox()
    setDimensions({
      width: width >= 200 ? width : 200,
      height,
    })
  }, [children, ref])

  return (
    <svg
      ref={ref}
      x="28.5%"
      y="-8%"
      width="50%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>

      <text
        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
        fill="#f50808"
        x="50%"
        y="80%"
        textAnchor="middle"
        fontSize="84"
        letterSpacing="-4"
        fontWeight="bold">
        {children}
      </text>
    </svg>
  )
}
