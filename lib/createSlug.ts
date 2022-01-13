import slugify from 'slugify'
import { customAlphabet } from 'nanoid'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 5)
export default (title: string) => `${slugify(title, { lower: true })}-${nanoid()}`
