import { FC } from 'react'
import { TextInput, Props as TextInputProps } from './TextInput'
import { ImageInput, Props as ImageInputProps } from './ImageInput'
import { NumberInput, Props as NumberInputProps } from './NumberInput'

type Props = ImageInputProps | TextInputProps | NumberInputProps | null

export const Input: FC<Props> = props => {
  switch (props.type) {
    case 'image':
      return <ImageInput {...props} />
    case 'currency':
      return <NumberInput {...props} />
    default:
      return <TextInput {...props} />
  }
}

export interface InputBase {
  disabled?: boolean
}
