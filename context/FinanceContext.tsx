"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Transaction = {
  id: string
  date: string
  type: "income" | "expense"
  category: string
  amount: number
  notes: string
}

type FinanceContextType = {
  transactions: Transaction[]
  addTransaction: (t: Transaction) => void
  deleteTransaction: (id: string) => void
}

const FinanceContext = createContext<FinanceContextType | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("transactions")
    if (stored) {
      setTransactions(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  }, [transactions, isLoaded])

  const addTransaction = (t: Transaction) => {
    setTransactions(prev => [...prev, t])
  }

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) throw new Error("useFinance must be used within FinanceProvider")
  return context
}
