import { useTemplate } from "../TemplateContext"

export const Box = ({children, ...props}) => {
    const { data } = useTemplate()

    console.log(data)
    
    return <div {...props}>{children}</div>
}