import { useBinanceTicker } from "../utils/binancehook";

interface binanceHookProp {
  crypto: {
    priceBinance: number;
    priceHistoryBinance: number[];
  };
}

export default function Charts() {
  const cryptocurrenciesBinance = useBinanceTicker();

  return (
    <>
      <div>
        {cryptocurrenciesBinance.map((crypto: binanceHookProp["crypto"], index: number) => (
          <div key={index}>
            <p>Price: {crypto.priceBinance}</p>
            <p>Price History: {crypto.priceHistoryBinance}</p>
          </div>
        ))}
      </div>
    </>
  );
}
