import Head from 'next/head'
import Image from 'next/image'  
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Header from '../components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Cryptocurrencies() {
    const names = [ 'Bitcoin', 'Ethereum', 'Dogecoin', 'Cardano', 'Binance Coin', 'XRP', 'Polkadot', 'Solana', 'Uniswap', 'Litecoin' ];
    return (
        <>
            <div className="container">
                <h1 className="title">Cryptocurrency Market Overview</h1>

                <table className="table">
                    <tbody>
                        <tr className="table-header">
                            <th className="table__start">#</th>
                            <th className="table__start">Cryptocurrency</th>
                            <th className="table__end">Price (USD)</th>
                            <th className="table__end">1h %</th>
                            <th className="table__end">24h %</th>
                            <th className="table__end">7d %</th>
                            <th className="table__end">Market Cap</th>
                            <th className="table__end">Volume (24h)</th>
                            <th className="table__end">Circulating Supply</th>
                            <th className="table__end">Last 7 Days</th>
                        </tr>
                        {names.map((name, index) => (
                            <tr key={name} className="table__row">
                                <td className="table__start">{index + 1}</td>
                                <td className="table__start">{name}</td>
                                <td className="table__end">49,999.99</td>
                                <td className="table__end">2.34%</td>
                                <td className="table__end">0.45%</td>
                                <td className="table__end">5.67%</td>
                                <td className="table__end">944,123,456,789</td>
                                <td className="table__end">23,456,789</td>
                                <td className="table__end">18,734,452 BTC</td>
                                <td className="table__end">Graph image</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
