import { createContext, useState } from "react";
import axios from "axios";
import { GlobalContent } from "../types/context";
import { Expense } from "../types/expense";
import { Income } from "../types/income";

const BASE_URL = "https://finance-health-indicator-backend.vercel.app/api/v1/";

export const GlobalContext = createContext<GlobalContent>({
  addIncome: () => {},
  getIncomes: () => {},
  incomes: [],
  deleteIncome: () => {},
  expenses: [],
  totalIncome: () => 0,
  addExpense: () => {},
  getExpenses: () => {},
  deleteExpense: () => {},
  totalExpenses: () => 0,
  totalBalance: () => 0,
  transactionHistory: () => [null],
  error: "",
  setError: () => {},
  accountHealth: () => ({ health: 0, status: "" }),
});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState<string>("");

  //   calculate incomes
  const addIncome = async (income: Income) => {
    await axios.post(`${BASE_URL}income`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}income`);
    setIncomes(response.data.data);
  };

  const deleteIncome = async (id: number) => {
    await axios.delete(`${BASE_URL}income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income: Income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate expenses
  const addExpense = async (income: Expense) => {
    await axios.post(`${BASE_URL}expense`, income).catch((err) => {
      setError(err.response.data.message);
    });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}expense`);
    setExpenses(response.data.data);
  };

  const deleteExpense = async (id: number) => {
    await axios.delete(`${BASE_URL}expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income: Expense) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3) as unknown as [Income | null];
  };

  const accountHealth = () => {
    const balance = totalBalance();
    const income = totalIncome();
    const health = (balance / income) * 100;
    let status: string;
    switch (true) {
      case health > 0 && health <= 10:
        status = "Poor";
        break;
      case health > 10 && health <= 50:
        status = "Fair";
        break;
      case health > 50 && health <= 75:
        status = "Good";
        break;
      case health > 75 && health <= 100:
        status = "Excellent";
        break;
      default:
        status = "Poor";
        break;
    }
    return {
      health: health > 0 ? health : 0,
      status,
    };
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        accountHealth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
