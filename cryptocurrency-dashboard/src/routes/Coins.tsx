import { isTemplateElement } from "@babel/types";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { string } from "yargs";
import { fetchCoins, fetchOhlcvToday } from "../api";
import "../styles/coins.css";
import PieChart from "./PieChart";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
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
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
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
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const coinId = data?.slice(0, 100).map((item) => item.id);
  // console.log(data?.slice(0, 100).map((item) => item.id));
  const { isLoading: ohlcvTodayisLoading, data: ohlcvTodayData } = useQuery<
    IOhlcvToday[]
  >("ohlcvToday", fetchOhlcvToday);
  // console.log(ohlcvTodayData);
  console.log(data);
  const AllCoins = ohlcvTodayData?.sort((a, b) => (a.rank > b.rank ? -1 : 1));
  let ohlcvToday: IOhlcvToday[] = [];

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

  console.log(sortPercentChange);
  return (
    <body className="coins-body">
      <Container>
        <InsideContainer>
          <>
            <div className="grid-wrapper">
              <CoinsList>
                <Header>
                  <Title>Dashboard</Title>
                </Header>
                {data?.slice(0, 100).map((coin) => (
                  <Coin key={coin.id}>
                    <Link
                      to={{
                        pathname: `/${coin.id}`,
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
                        {ohlcvTodayData?.map((item) =>
                          item.symbol == coin.symbol ? (
                            <Priceinfo>
                              <span className="coin__name">
                                {item.quotes.USD.price.toFixed(2)}
                              </span>
                              <span className="coin__symbol">
                                {`${item.quotes.USD.percent_change_24h}%`}
                              </span>
                            </Priceinfo>
                          ) : null,
                        )}
                      </GridCoinInfo>
                    </Link>
                  </Coin>
                ))}
              </CoinsList>
              <PopularCoins>
                <Header>
                  <Title className="header-popular">Most Popular</Title>
                </Header>
                <CardsCoins>
                  {sortPercentChange?.slice(0, 3).map((item) => (
                    <>
                      <div className="grid--cards">
                        <Img
                          src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}
                        />
                        <div className="cards-info">
                          <span className="cards-info__name">{item.name}</span>
                          <span className="cards-info__symbol">
                            {item.symbol}
                          </span>
                        </div>
                        <div className="cards-price">
                          $ {item.quotes.USD.price.toFixed(2)}
                        </div>
                        <div className="cards-price__change_7d">
                          {item.quotes.USD.percent_change_7d}% this week
                        </div>
                      </div>
                    </>
                  ))}
                </CardsCoins>
              </PopularCoins>

              <PersonalInfo>
                <MyPortfolio>
                  <Header>
                    <Title>My Portfolio</Title>
                  </Header>
                  <PieChart></PieChart>
                  <div className="grid-portfolio">
                    <img
                      className="portfolio-img"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABs0lEQVRIie3UsW9NcRQH8M+rpwhNRCIGHSSmKlEabGKxmJpIu0hEWCQGk8RoMTCSVEwEi0qQ+APEJEJanXQpBgOREDSqvKrh/JrePve9++7Lq8k3+eX+7v2d8/2e8zv3HP5jBbAKx/ASV7B1JchfYQHvMY/ZToh1YThD/hZnsQb9uIUa5nAdve1EPpXIX+MkVqOSCPcn2124Zymzq1rI7GgD8mx2d3Gwzi9PbGOewCH8bkDeKrJi97MH1fTcLa7jGQ6k1Q4+4R325InM4TNGUiQz6EnCX5uQdmN9sqkknxlMN4vkDR6k/WNMFER+QtRwQFz5AobqjboKSDqCfyJSLTZZhj5cw04RYHf6/kTUBG7jl6jtOE6XFRkT3f0QPwts14reu1lGZIPI4BLOt+gzi1NlarIY0I8G54N4kdajjEi17HU1Q030GnzJi64TmMThvINFkSOisTZjnyhwv5hhY8mmfp7dwHOM4jK+4wLOYRvO1ItsEXf6Ib0P4ltmz989NYCPab/D0vjZLn71ttAjxsbFEj6jqFUKzZZjCptwR3GfrMPx5FMKe0UXz4usmq0anqLvD6BfaEl2/jPNAAAAAElFTkSuQmCC"
                    ></img>
                    <div className="portfolio-info">
                      <div className="portfolio-info__name">
                        Current balance
                      </div>
                      <div className="portfolio-info__price">0.0032231 BTC</div>
                    </div>
                  </div>

                  <div className="grid-portfolio">
                    <img
                      className="portfolio-img"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABqUlEQVRIib3Vv0tWURgH8E8igSH49obRIIVSEITRYEFTizhFg0siJC5BQ2vQ9EJD0B/Qv9AkFU4ZNrg5RCgYtPQKBbqUoYiD+KOGc4LLfe97fxV+4XDvPec53+/zPOfc5+EEcKqETQMPcKYk5zrmqjhxDiv4XWEco5kk6S0Q+IAb8XsC7QKnHuEJTleJ4ADvoodXS+x7Gm0vJCd7MgwbWMAoZjFfxqs8pNPVg0WM4UcUGeqy9zluxfdVIU2ZSEdyPgps4DvOYg/v8S1lO4DbGMfj7nF0P/iXeJG3UfC+TziDXOTdrjQeClES/plpLOMjJv+HyDO0sIvDOLeAKSGdrX8V+SvwJpIeZNjs5hFkXeEkWiUEClEkMiPUodoCFKfrGvbrkpcVGYtCSWzjNY5wTygha8JNqyXyCpcy5kexibdCyr/iSl2Rm7iYmtuJpDCMQZ3VoJJIv1BakkhelkZc38LPuiJLOiOB60J9WxW6axuX64rc1dlHtvFZqFl3hIP/kkfSTaSJEaFkfMpYH47PjThE+2aGbSb5sWo9vXKP/4X70au6aEeek8Uf+SxnixlXBHUAAAAASUVORK5CYII="
                    ></img>
                    <div className="portfolio-info">
                      <div className="portfolio-info__name">Investment</div>
                      <div className="portfolio-info__price">
                        +$9,100,100.00
                      </div>
                    </div>
                  </div>
                </MyPortfolio>
              </PersonalInfo>
            </div>
          </>
        </InsideContainer>
      </Container>
    </body>
  );
}
export default Coins;
