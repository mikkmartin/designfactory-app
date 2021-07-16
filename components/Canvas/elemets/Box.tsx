//import { useTemplate } from "../TemplateContext"

export const Box = ({children, ...props}) => {    
    return <div {...props}>{children}</div>
}