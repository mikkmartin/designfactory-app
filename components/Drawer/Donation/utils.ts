import { snappy } from 'static/transitions'
import { fontFamily, placeholderColor } from 'components/GlobalStyles'

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const animations = (shown, direction) => ({
  transition: { ...snappy, opacity: { duration: 0.075 } },
  animate: shown ? 'shown' : 'hidden',
  variants: {
    shown: { x: 0, opacity: 1 },
    hidden: { x: direction ? 50 : -50, opacity: 0 },
  },
  style: { pointerEvents: shown ? 'auto' : 'none' },
})

export const stripeInputStyle = iconState => ({
  base: {
    iconColor: iconState !== 'unknown' ? 'white' : 'transparent',
    fontFamily,
    fontSize: '14px',
    lineHeight: '48px',
    color: 'white',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: placeholderColor,
    },
  },
  complete: {
    iconColor: '#74E503',
  },
  invalid: {
    color: 'tomato',
    iconColor: 'tomato',
  },
})

export const stripeTokenHandler = async props => {
  const response = await fetch('/api/payment/donate', {
    body: JSON.stringify(props),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
