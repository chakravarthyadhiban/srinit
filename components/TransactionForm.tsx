"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFinance } from "@/context/FinanceContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const categories = [
  "Salary",
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Other"
]

export default function TransactionForm() {
  const { addTransaction } = useFinance()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    category: "Food",
    amount: "",
    notes: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.date || !form.amount) {
      return
    }

    addTransaction({
      id: Date.now().toString(),
      date: form.date,
      type: form.type as "income" | "expense",
      category: form.category,
      amount: Number(form.amount),
      notes: form.notes
    })

    setIsSubmitted(true)

    setTimeout(() => {
      setForm({
        date: new Date().toISOString().split("T")[0],
        type: "expense",
        category: "Food",
        amount: "",
        notes: ""
      })
      setIsSubmitted(false)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-md">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Transaction Added!</h3>
          <p className="text-muted-foreground text-sm">Your transaction has been saved successfully.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
        <CardDescription>Add a new income or expense entry</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={form.type}
              onValueChange={value => setForm({ ...form, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category}
              onValueChange={value => setForm({ ...form, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
