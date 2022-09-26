import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import styled from "styled-components";
import "../styles/tradehistory.css";

function TradeHistory() {
  // interface ITradeHistory {
  //   time: string;
  //   type: string;
  //   amount: number;
  //   total: number;
  // }

  const tradeHistory = [
    {
      time: "21:33:10",
      symbol: "BTC",
      type: "Buy",
      amount: 100,
      total: 230.35,
    },
    {
      time: "04:07:07",
      symbol: "PLA",
      type: "Sell",
      amount: 200,
      total: 460.7,
    },
    {
      time: "03:03:03",
      symbol: "SAND",
      type: "Sell",
      amount: 100,
      total: 230.35,
    },
  ];
  console.log(tradeHistory);

  const TradeWrapper = styled.div`
    background: #ebe8e8fa;
    border-radius: 25px;
    padding: 30px;
  `;

  return (
    <>
      <TradeWrapper>
        <div className="smtitle-trade__history">
          <span>Time</span>
          <span>Symbol</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Total Price</span>
        </div>
        {tradeHistory?.map((coin) => (
          <div className="smtitle-trade__history-data">
            <span>{coin.time}</span>
            <span>{coin.symbol}</span>
            <span className="trade--history-type">{coin.type}</span>
            <span>{coin.amount}</span>
            <span>${coin.total}</span>
          </div>
        ))}
      </TradeWrapper>
    </>
  );
}

export default TradeHistory;
