import { FC, createContext, useContext, useState, Dispatch, SetStateAction, useRef, MutableRefObject } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

type Donation = 'Monthly' | 'One time'

type Values = {
  amount: number,
  setAmount: Dispatch<SetStateAction<number>>,
  paymentType: Donation,
  setPaymentType: Dispatch<SetStateAction<Donation>>
  handleSubmit: null | Function,
  setSubmitHandler: (Function) => void,
  setError: Dispatch<SetStateAction<string>>,
  error: string,
}

//@ts-ignore
const Context = createContext<Values>()

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
export const DonationProvider: FC = ({ children }) => {
  const [amount, setAmount] = useState(3)
  const [paymentType, setPaymentType] = useState<Donation>('Monthly')
  const [error, setError] = useState<string>('')
  const submitHandler = useRef(null)

  return (
    <Context.Provider value={{
      amount,
      setAmount,
      paymentType,
      setPaymentType,
      handleSubmit: submitHandler.current,
      setSubmitHandler: fn => submitHandler.current = fn,
      setError,
      error,
    }}>
      <Elements stripe={stripe}>
        {children}
      </Elements>
    </Context.Provider>
  )
}

export const useDonation = () => useContext(Context)
