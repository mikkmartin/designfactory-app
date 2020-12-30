import { FC, createContext, useContext, useState, Dispatch, SetStateAction, useRef } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export type DonationType = 'Monthly' | 'One time'

type Values = {
  amount: number,
  setAmount: Dispatch<SetStateAction<number>>,
  paymentType: DonationType,
  setPaymentType: Dispatch<SetStateAction<DonationType>>
  handleSubmit: null | Function,
  setSubmitHandler: (Function) => void,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  showError: (string) => void,
  error: string,
}

//@ts-ignore
const Context = createContext<Values>()

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
export const DonationProvider: FC = ({ children }) => {
  const [amount, setAmount] = useState(3)
  const [paymentType, setPaymentType] = useState<DonationType>('Monthly')
  const [error, setError] = useState<string>('')
  const submitHandler = useRef(null)
  const [loading, setLoading] = useState(true)

  const showError = (str) => {
    setError(str)
    setTimeout(() => setError(''), 2000)
  }

  return (
    <Context.Provider value={{
      amount,
      setAmount,
      paymentType,
      setPaymentType,
      handleSubmit: submitHandler.current,
      setSubmitHandler: fn => submitHandler.current = fn,
      loading,
      setLoading,
      showError,
      error,
    }}>
      <Elements stripe={stripe}>
        {children}
      </Elements>
    </Context.Provider>
  )
}

export const useDonation = () => useContext(Context)
