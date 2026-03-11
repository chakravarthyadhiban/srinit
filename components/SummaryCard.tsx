import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils/calculations"
import type { LucideIcon } from "lucide-react"

type Props = {
  title: string
  value: number
  icon: LucideIcon
  variant?: "default" | "income" | "expense" | "balance"
}

export default function SummaryCard({ title, value, icon: Icon, variant = "default" }: Props) {
  return (
    <Card className={cn(
      "overflow-hidden",
      variant === "income" && "border-emerald-200 dark:border-emerald-900",
      variant === "expense" && "border-rose-200 dark:border-rose-900",
      variant === "balance" && value >= 0 
        ? "border-blue-200 dark:border-blue-900" 
        : "border-orange-200 dark:border-orange-900"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn(
              "text-2xl font-bold mt-1",
              variant === "income" && "text-emerald-600 dark:text-emerald-400",
              variant === "expense" && "text-rose-600 dark:text-rose-400",
              variant === "balance" && value >= 0 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-orange-600 dark:text-orange-400"
            )}>
              {formatCurrency(value)}
            </p>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            variant === "default" && "bg-muted",
            variant === "income" && "bg-emerald-100 dark:bg-emerald-900/30",
            variant === "expense" && "bg-rose-100 dark:bg-rose-900/30",
            variant === "balance" && value >= 0 
              ? "bg-blue-100 dark:bg-blue-900/30" 
              : "bg-orange-100 dark:bg-orange-900/30"
          )}>
            <Icon className={cn(
              "w-6 h-6",
              variant === "default" && "text-muted-foreground",
              variant === "income" && "text-emerald-600 dark:text-emerald-400",
              variant === "expense" && "text-rose-600 dark:text-rose-400",
              variant === "balance" && value >= 0 
                ? "text-blue-600 dark:text-blue-400" 
                : "text-orange-600 dark:text-orange-400"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
