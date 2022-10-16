import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Buy from "../routes/Buy";
import Sell from "../routes/Sell";
import {
  fetchCoinHistory,
  fetchCoinInfo,
  fetchCoins,
  fetchCoinTickers,
} from "../api";
import "../styles/coin.css";
import Chart from "../routes/Chart";
import { boolean, number, string } from "yargs";
import TradeHistory from "../routes/TradeHistory";
import Coins from "../routes/Coins";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CoinWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 900;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.textColor};
  a {
    display: block;
  }
  :hover {
    border-bottom: 5px solid lightgreen;
  }
`;
const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 300px;
  padding-bottom: 309.391px;
  background-color: white;
  border-radius: 25px;
  margin: 20px;
  width: 100%;
  padding: 10px;
  padding: 20px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
  symbol: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
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
  // quotes: {
  //   USD: {
  //     ath_date: string;
  //     ath_price: number;
  //     market_cap: number;
  //     market_cap_change_24h: number;
  //     percent_change_1h: number;
  //     percent_change_1y: number;
  //     percent_change_6h: number;
  //     percent_change_7d: number;
  //     percent_change_12h: number;
  //     percent_change_15m: number;
  //     percent_change_24h: number;
  //     percent_change_30d: number;
  //     percent_change_30m: number;
  //     percent_from_price_ath: number;
  //     price: number;
  //     volume_24h: number;
  //     volume_24h_change_24h: number;
  //   };
  // };
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
interface IHistorical {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coin({ symbol, name }: ICoin) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const buyMatch = useRouteMatch("/cryptocurrency-dashboard/:coinId/buy");
  const sellMatch = useRouteMatch("/cryptocurrency-dashboard/:coinId/sell");

  // const { isLoading, data } = useQuery<IHistorical[]>(
  //   ["ohlcv", props.symbol],
  //   () => fetchCoinHistory(props.symbol),
  // );

  return (
    <Container>
      <InsideContainer>
        <Coins />
        <Header>
          <Link to={"/cryptocurrency-dashboard"}>
            <span className="header-btn__back">{`< `}</span>
          </Link>
          <Title>
            <Img
              src={`https://coinicons-api.vercel.app/api/icon/${state.symbol.toLowerCase()}`}
            />
            {state.symbol}
          </Title>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Wrapper>
              <CoinWrapper>
                <Chart coinId={coinId} />
                <Header>
                  <Title>Trade History</Title>
                </Header>
                <TradeHistory />
              </CoinWrapper>
              <TradeWrapper>
                <Tabs className="tabs">
                  <Tab isActive={buyMatch !== null}>
                    <Link
                      to={{
                        pathname: `/cryptocurrency-dashboard/${coinId}/buy`,
                        state: { name: state.name, symbol: state.symbol },
                      }}
                    >
                      Buy
                    </Link>
                  </Tab>
                  <Tab isActive={sellMatch !== null}>
                    <Link
                      to={{
                        pathname: `/cryptocurrency-dashboard/${coinId}/sell`,
                        state: { name: state.name, symbol: state.symbol },
                      }}
                    >
                      Sell
                    </Link>
                  </Tab>
                </Tabs>
                <Switch>
                  <Route path={`/cryptocurrency-dashboard/:coinId/buy`}>
                    <Buy />
                  </Route>
                  <Route path={`/cryptocurrency-dashboard/:coinId/sell`}>
                    <Sell />
                  </Route>
                </Switch>
              </TradeWrapper>
            </Wrapper>
          </>
        )}
      </InsideContainer>
    </Container>
  );
}
export default Coin;
