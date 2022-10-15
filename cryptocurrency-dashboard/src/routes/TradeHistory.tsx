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
            <span className="trade__border">{coin.time}</span>
            <span className="trade__border">{coin.symbol}</span>
            <span className="trade--history-type trade__border">
              {coin.type}
            </span>
            <span className="trade__border">{coin.amount}</span>
            <span className="trade__border">${coin.total}</span>
          </div>
        ))}
      </TradeWrapper>
    </>
  );
}

export default TradeHistory;
