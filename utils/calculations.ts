import type { Transaction } from "@/context/FinanceContext"

export function calculateTotals(transactions: Transaction[]) {
  let income = 0
  let expense = 0

  transactions.forEach(t => {
    if (t.type === "income") income += t.amount
    else expense += t.amount
  })

  return {
    totalIncome: income,
    totalExpense: expense,
    profitLoss: income - expense,
    balance: income - expense
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
