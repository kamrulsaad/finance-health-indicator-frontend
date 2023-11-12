import { Expense } from "./expense";
import { Income } from "./income";

export type GlobalContent = {
  addIncome: (income: Income) => void;
  getIncomes: () => void;
  incomes: Income[];
  totalIncome: () => number;
  deleteIncome: (id: number) => void;
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  getExpenses: () => void;
  deleteExpense: (id: number) => void;
  totalExpenses: () => number;
  totalBalance: () => number;
  // transactionHistory: any;
  error: string;
  setError: (error: string) => void;
};
