import { useBinanceTicker } from "../utils/binancehook";

interface binanceHookProp {
    crypto: {
        priceBinance: number;
        priceHistoryBinance: { price: number; time: string }[];
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
                        <p>Price History:</p>
                        <ul>
                            {crypto.priceHistoryBinance?.map((price: any, index: number) => (
                                <li key={index}>{`${price.time}: ${price.price.toFixed(2)}`}</li>
                            ))}

                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
