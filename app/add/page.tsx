import TransactionForm from "@/components/TransactionForm"

export default function AddPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
        <p className="text-muted-foreground mt-1">
          Record a new income or expense
        </p>
      </div>

      <TransactionForm />
    </div>
  )
}
