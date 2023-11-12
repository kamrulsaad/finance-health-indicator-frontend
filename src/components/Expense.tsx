import styled from "styled-components";
import { InnerLayout } from "../styles/Layout";
import { useGlobalContext } from "../utils/useGlobalContext";
import IncomeItem from "./IncomeItem";
import { useEffect } from "react";
import ExpenseForm from "./ExpenseForm";

function Expense() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>${totalExpenses()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((income) => {
              const { id, title, amount, date, category, description } =
                income;
              return (
                <IncomeItem
                  key={id}
                  id={id!}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={'expense'}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expense;
