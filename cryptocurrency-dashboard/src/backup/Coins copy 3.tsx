import { isTemplateElement } from "@babel/types";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { string } from "yargs";
import { fetchCoins, fetchOhlcvToday } from "../api";
import "../styles/coins.css";
import "../styles/responsive.css";
import PieChart from "../routes/PieChart";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background-color: #0000009c;
  border-radius: 25px;
  margin: 20px;
  width: 100%;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CoinsList = styled.ul`
  margin: 20px;
  height: 80vh;
  width: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Coin = styled.li`
  background-color: #0000009c;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
  &:focus-within {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const PopularCoins = styled.div``;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.accentColor};
  font-size: 34px;
  color: black;
  margin-left: 20px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Nameinfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Priceinfo = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-end;
`;

const CardsCoins = styled.div`
  display: flex;
`;

const GridCoinInfo = styled.div`
  display: flex;

  width: 100%;
  justify-content: space-between;
`;

const PersonalInfo = styled.div`
  width: 100%;
`;

const MyPortfolio = styled.div``;
interface ICoin {
  [x: string]: any;
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface IOhlcvToday {
  id: string;
  name: string;
  symbol: string;
  rank: number;
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
      percent_change_24h: number | any;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };

  total_supply: number;
}

function Coins() {
  let { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const coinId = data?.slice(0, 100).map((item) => item.id);
  // console.log(data?.slice(0, 100).map((item) => item.id));
  const { isLoading: ohlcvTodayisLoading, data: ohlcvTodayData } = useQuery<
    IOhlcvToday[]
  >("ohlcvToday", fetchOhlcvToday);
  // console.log(ohlcvTodayData);
  // console.log(data);
  const AllCoins = ohlcvTodayData?.sort((a, b) => (a.rank > b.rank ? -1 : 1));
  let ohlcvToday: IOhlcvToday[] = [];

  // let coinData = data?.filter((v, i) => data.indexOf(v) === i);
  // let ohlcvData = ohlcvTodayData?.filter(
  //   (v, i) => ohlcvTodayData.indexOf(v) === i,
  // );
  ohlcvTodayData?.map((item) =>
    item.quotes.USD.price > 1 ? ohlcvToday.push(item) : null,
  );

  const sortPercentChange = ohlcvToday?.sort(
    (
      a: { quotes: { USD: { percent_change_24h: number } } },
      b: { quotes: { USD: { percent_change_24h: number } } },
    ) =>
      a.quotes.USD.percent_change_24h > b.quotes.USD.percent_change_24h
        ? -1
        : 1,
  );
  console.log(data);

  // console.log(sortPercentChange);
  return (
    <body className="coins-body">
      <Container className="coins-body_container">
        <InsideContainer>
          <>
            <div className="grid-wrapper">
              <CoinsList className="responsive-coinList">
                {data?.slice(0, 100).map((coin) => (
                  <Coin key={coin.id}>
                    <Link
                      to={{
                        pathname: `/cryptocurrency-dashboard/${coin.id}`,
                        state: { name: coin.name, symbol: coin.symbol },
                      }}
                    >
                      <Img
                        src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                      />
                      <GridCoinInfo>
                        <Nameinfo>
                          <span className="coin__name">{coin.name}</span>
                          <span className="coin__symbol">{coin.symbol}</span>
                        </Nameinfo>
                      </GridCoinInfo>
                    </Link>
                  </Coin>
                ))}
              </CoinsList>
            </div>
          </>
        </InsideContainer>
      </Container>
    </body>
  );
}
export default Coins;
