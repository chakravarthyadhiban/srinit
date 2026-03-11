"use client"

import { useFinance } from "@/context/FinanceContext"
import { formatCurrency } from "@/utils/calculations"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, FileText } from "lucide-react"

type MonthlyData = {
  income: number
  expense: number
}

export default function ReportsPage() {
  const { transactions } = useFinance()

  const monthly: Record<string, MonthlyData> = {}

  transactions.forEach(t => {
    const month = t.date.slice(0, 7)

    if (!monthly[month]) {
      monthly[month] = { income: 0, expense: 0 }
    }

    if (t.type === "income") monthly[month].income += t.amount
    else monthly[month].expense += t.amount
  })

  const sortedMonths = Object.entries(monthly).sort(
    (a, b) => b[0].localeCompare(a[0])
  )

  const formatMonth = (dateStr: string) => {
    const [year, month] = dateStr.split("-")
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
  }

  if (sortedMonths.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monthly Reports</h1>
          <p className="text-muted-foreground mt-1">
            View your income and expenses by month
          </p>
        </div>

        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No data yet</h3>
            <p className="text-muted-foreground text-sm">
              Add some transactions to see your monthly reports.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Monthly Reports</h1>
        <p className="text-muted-foreground mt-1">
          View your income and expenses by month
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedMonths.map(([month, data]) => {
          const net = data.income - data.expense
          const isPositive = net >= 0

          return (
            <Card key={month}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-base">{formatMonth(month)}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">Income</span>
                  </div>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(data.income)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                    <span className="text-sm text-muted-foreground">Expense</span>
                  </div>
                  <span className="font-medium text-rose-600 dark:text-rose-400">
                    {formatCurrency(data.expense)}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net</span>
                    <span className={`font-bold ${
                      isPositive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-orange-600 dark:text-orange-400"
                    }`}>
                      {isPositive ? "+" : ""}{formatCurrency(net)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
