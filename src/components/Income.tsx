import { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layout";
import Form from "./Form";
import { useGlobalContext } from "../utils/useGlobalContext";
import IncomeItem from "./IncomeItem";

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>${totalIncome()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income, index) => {
              const { id, title, amount, date, category, description } = income;
              return (
                <IncomeItem
                  key={index}
                  id={id!}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={"income"}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
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

export default Income;
