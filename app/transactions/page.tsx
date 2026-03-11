import TransactionTable from "@/components/TransactionTable"

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your transactions
        </p>
      </div>

      <TransactionTable />
    </div>
  )
}
