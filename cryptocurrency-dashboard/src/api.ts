const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json(),
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  );
}

export function fetchCoinHistory(coinId: string) {
  const td = new Date();
  const searchDate = [
    td.getFullYear(),
    td.getMonth() + 1 < 10 ? `0${td.getMonth() + 1}` : td.getMonth(),
    td.getDate() < 10 ? `0${td.getDate() + 1}` : td.getDate(),
  ].join("-");

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${searchDate}&end=${searchDate}`,
  ).then((response) => response.json());
}

export function fetchTickerSpecificCoin(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  );
}

export function fetchOhlcvToday() {
  return fetch(`${BASE_URL}/tickers`).then((response) => response.json());
}