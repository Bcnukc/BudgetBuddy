import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "Expense"]),
  category: z.string().min(1, "Category is required"),
  date: z.date(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional(),
});
