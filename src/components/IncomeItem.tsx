import styled from "styled-components";
import { dateFormat } from "../utils/dateFormat";
import {
  account,
  calender,
  comment,
  couch,
  dollar,
  drawings,
  expense,
  loan,
  money,
  piggy,
  trash,
  truck,
  users,
  wallet,
} from "../utils/Icons";
import Button from "./Button";

interface IncomeItemProps {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  deleteItem: (id: number) => void;
  indicatorColor: string;
  type: string;
}

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  deleteItem,
  indicatorColor,
  type,
}: IncomeItemProps) {
  const categoryIcon = () => {
    switch (category) {
      case "cash":
        return wallet;
      case "sales revenue":
        return money;
      case "service revenue":
        return users;
      case "equipment":
        return couch;
      case "account receivable":
        return piggy;
      case "supplies":
        return truck;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "notes payable":
        return money;
      case "loan":
        return loan;
      case "accounts payable":
        return account;
      case "drawings":
        return drawings;
      case "expenses":
        return expense;
      default:
        return money;
    }
  };

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {category}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              name=""
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div<{
  indicator: string;
}>`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
