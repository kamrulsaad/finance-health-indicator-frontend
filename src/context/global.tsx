import { createContext, useState } from "react";
import axios from "axios";
import { Income } from "../types/income";
import { GlobalContent } from "../types/context";
import { Expense } from "../types/expense";

const BASE_URL = "http://localhost:5000/api/v1/";

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
  // transactionHistory: () => {},
  error: "",
  setError: () => {},
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

  // const transactionHistory = () => {
  //   const history = [...incomes, ...expenses];
  //   history.sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });

  //   return history.slice(0, 3);
  // };

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
        // transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
