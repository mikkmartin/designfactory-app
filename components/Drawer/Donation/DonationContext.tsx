import { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

type Values = {
  amount: number,
  setAmount: Dispatch<SetStateAction<number>>
}

//@ts-ignore
const Context = createContext<Values>()

export const DonationProvider: FC = ({ children }) => {
  const [amount, setAmount] = useState(4)
  return (
    <Context.Provider value={{
      amount,
      setAmount
    }}>
      {children}
    </Context.Provider>
  )
}

export const useDonation = () => useContext(Context)
