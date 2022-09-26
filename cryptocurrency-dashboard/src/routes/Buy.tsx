import { any } from "prop-types";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { fetchTickerSpecificCoin } from "../api";
import "../styles/buy.css";

const Coininfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;

const BuyWrapper = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  font-size: 34px;
  color: black;
  margin-left: 20px;
`;

interface RouteParams {
  coinId: string;
}
interface ITickerSpecificCoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}
function Buy(props: any) {
  const { coinId } = useParams<RouteParams>();
  const { isLoading, data } = useQuery<ITickerSpecificCoin>(
    ["tickerSpecific", coinId],
    () => fetchTickerSpecificCoin(coinId),
  );
  const price = data?.quotes.USD.price.toFixed(2);

  let [priceForBuy, setPriceForBuy] = useState("") ?? [];
  let [volumnForBuy, setVolumnForBuy] = useState("") ?? [];
  let totalPrice = Number(priceForBuy) * Number(volumnForBuy);
  // let calTotalPrice = () => {
  //   return Number(priceForBuy) * Number(volumnForBuy);
  // };

  return (
    <>
      <div className="buy__total-price">
        <div className="buy__text">Price </div>
        <div className="buy__box">${price}</div>
      </div>
      <BuyWrapper>
        <div>
          <button>-</button>
          <input
            type="text"
            id="buy__voulmn"
            placeholder="amount"
            onChange={(e) => setVolumnForBuy(e.target.value)}
          ></input>
          <button>+</button>
        </div>
        <div>
          <button>-</button>
          <input
            type="text"
            id="buy__price"
            placeholder="price"
            onChange={(e) => setPriceForBuy(e.target.value)}
          ></input>
          <button>+</button>
        </div>
        <div className="buy__total-price">
          <div>Total</div>
          <div className="buy__box">
            USD
            {volumnForBuy == "" ? price : totalPrice}
          </div>
        </div>
        <button className="btn__buy">Buy</button>
      </BuyWrapper>
    </>
  );
}

export default Buy;
