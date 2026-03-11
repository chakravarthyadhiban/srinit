"use client"

import { useFinance } from "@/context/FinanceContext"
import { formatCurrency } from "@/utils/calculations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2, ArrowUpCircle, ArrowDownCircle, InboxIcon } from "lucide-react"

export default function TransactionTable() {
  const { transactions, deleteTransaction } = useFinance()

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <InboxIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
          <p className="text-muted-foreground text-sm">
            Start by adding your first income or expense.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
        <CardDescription>{transactions.length} total transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map(t => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">
                  {new Date(t.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {t.type === "income" ? (
                      <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4 text-rose-500" />
                    )}
                    <Badge variant={t.type === "income" ? "secondary" : "outline"}>
                      {t.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell className={`text-right font-medium ${
                  t.type === "income" 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-rose-600 dark:text-rose-400"
                }`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate">
                  {t.notes || "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTransaction(t.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete transaction</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
