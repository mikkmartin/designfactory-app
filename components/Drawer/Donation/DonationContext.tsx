import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

type Donation = 'Monthly' | 'One time'

type Values = {
  amount: number,
  setAmount: Dispatch<SetStateAction<number>>,
  paymentType: Donation,
  setPaymentType: Dispatch<SetStateAction<Donation>>
}

//@ts-ignore
const Context = createContext<Values>()

export const DonationProvider: FC = ({ children }) => {
  const [amount, setAmount] = useState(4)
  const [paymentType, setPaymentType] = useState<Donation>('Monthly')

  return (
    <Context.Provider value={{
      amount,
      setAmount,
      paymentType,
      setPaymentType
    }}>
      {children}
    </Context.Provider>
  )
}

export const useDonation = () => useContext(Context)
