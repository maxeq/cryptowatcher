import { getSymbols, findByValue } from "../utils/index.js";
import { CRYPTOCURRENCIES } from "../configs/index.js";


function getPriceBtc() {
    const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=BTCBUSD`;

    let binanceApi = async () => {
      const response = await fetch(url);
      const data = await response.json();
      return [data];
    };
    
    return binanceApi(); // return the result of the fetch operation
};
  

function mapCryptocurrencyData(data, cryptocurrencies) {
  return cryptocurrencies.map((item) => {
    const { lastPrice, lowPrice, highPrice } =
      findByValue(data, item.symbol) || {};
    console.log(lastPrice, lowPrice, highPrice)
    return {
      ...item,
      highPrice,
      lowPrice,
      price: lastPrice,
      prevPrice: item?.price || 0,
    };
  });
}

getPriceBtc()
  .then((data) => {
    const mappedData = mapCryptocurrencyData(data, CRYPTOCURRENCIES);
  })
  .catch((error) => console.log(error));