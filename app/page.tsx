"use client"

import { useFinance } from "@/context/FinanceContext"
import { calculateTotals } from "@/utils/calculations"
import SummaryCard from "@/components/SummaryCard"
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react"

export default function Dashboard() {
  const { transactions } = useFinance()
  const totals = calculateTotals(transactions)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Income"
          value={totals.totalIncome}
          icon={TrendingUp}
          variant="income"
        />
        <SummaryCard
          title="Total Expenses"
          value={totals.totalExpense}
          icon={TrendingDown}
          variant="expense"
        />
        <SummaryCard
          title="Profit / Loss"
          value={totals.profitLoss}
          icon={PiggyBank}
          variant="balance"
        />
        <SummaryCard
          title="Balance"
          value={totals.balance}
          icon={Wallet}
          variant="balance"
        />
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No transactions yet. Start by adding your first transaction.</p>
        </div>
      )}
    </div>
  )
}
