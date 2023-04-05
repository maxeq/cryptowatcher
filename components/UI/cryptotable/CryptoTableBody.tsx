import ChartFetcher from "@/components/charts/ChartFetcher";
import PriceChange from "@/utils/PriceArrowFormatter";
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
import { formatPrice } from "@/utils/NumberFormatter";


const CryptoTableBody: React.FC<{ crypto: any, index: number }> = ({ crypto, index }) => {

    // tooltips for bar
    const [showTooltipx, setShowTooltipx] = useState<Record<number, boolean>>({});

    const handleTooltipVisibility = (index: any, visible: any) => {
        setShowTooltipx((prev) => ({ ...prev, [index]: visible }));
    };

    return (
        <tr key={crypto.id}>
            <td className="th-rank hidden md:table-cell table__start sticky z-0 backdrop-opacity-0">
                <div className="h-full w-full flex items-center justify-center">
                    {crypto.market_cap_rank}
                </div>
            </td>
            <td className="th-name table__start sticky z-0 backdrop-opacity-0">
                <div className={`flex items-center mr-5 md:mr-0`}>
                    <Image
                        src={crypto.image}
                        alt={crypto.name}
                        width="32"
                        height="32"
                        className="mr-3"
                    />
                    <Link href={`/cryptocurrencies/${crypto.id}`}>
                        <div className="">
                            <span className="flex flex-col md:flex-items">
                                <span className="mr-2">{crypto.name}</span>
                                <span className="uppercase text-slate-300 text-12px mr-3">
                                    <span className="md:hidden mr-2 bg-slate-700 px-2 py-1 rounded-md text-left">
                                        {crypto.market_cap_rank}</span>{crypto.symbol}</span>
                            </span>
                        </div>
                    </Link>
                </div>
            </td>
            <td className="th-price table__end">
                {formatPrice(crypto.current_price)}
            </td>
            <td
                className={`th-change table__end`}>
                <PriceChange value={crypto.price_change_percentage_1h_in_currency} />
            </td>
            <td
                className={`th-change table__end`}
            >
                <PriceChange value={crypto.price_change_percentage_24h} />
            </td>
            <td
                className={`th-change table__end`}
            >
                <PriceChange value={crypto.price_change_percentage_7d_in_currency} />
            </td>
            <td className="th-marketcap table__end">
                {formatPrice(crypto.market_cap)}
            </td>
            <td className="th-volume table__end">
                <div>
                    {formatPrice(crypto.total_volume)}
                </div>
                <div className='text-slate-300 text-12px item-centered flex justify-end whitespace-nowrap'>
                    {formatPrice(crypto.total_volume / crypto.current_price, false)} {crypto.symbol.toUpperCase()}
                </div>

            </td>
            <td className="th-supply table__end whitespace-nowrap">

                {formatPrice(crypto.circulating_supply).replace('$', '')} {crypto.symbol.toUpperCase()}

                {crypto.max_supply !== 0 && crypto.circulating_supply !== 0 && isFinite(crypto.circulating_supply / crypto.max_supply) ? (
                    <div
                        className="relative w-3/4 h-2 bg-slate-100/50 rounded-full ml-auto"
                        onMouseEnter={() => handleTooltipVisibility(index, true)}
                        onMouseLeave={() => handleTooltipVisibility(index, false)}
                    >
                        <div
                            className="absolute left-0 h-2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{
                                width: `${((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(0)}%`,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.5) 50%, transparent 50%)',
                                backgroundSize: '200% 100%',
                                backgroundPosition: 'right bottom',
                                transition: 'background-position 0.5s ease-out'
                            }}
                        ></div>
                        {showTooltipx[index] && (
                            <div className="space-y-1 hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-4 leading-relaxed normal-case text-left">
                                <div className="flex items-center justify-between">
                                    <div className="text-slate-200">Percentage</div>
                                    <div className="text-slate-200">{((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(0)}%</div>
                                </div>
                                <div>

                                    <div
                                        className="relative w-full h-2 bg-slate-500/50 rounded-full"
                                        style={{
                                            width: `${((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(0)}%`,
                                            backgroundSize: '100% 200%',
                                            backgroundPosition: 'left bottom',
                                            transition: 'background-position 0.5s ease-out'
                                        }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-slate-200 mr-20">Circulating Supply</div>
                                    <div>{formatPrice(crypto.circulating_supply, false)} {crypto.symbol.toUpperCase()}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-slate-200">Max Supply</div>
                                    <div>{formatPrice(crypto.max_supply, false)} {crypto.symbol.toUpperCase()}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
            </td>
            <td className={`th-chart table__end`} style={{ width: '150px', height: '75px' }}>
                <ChartFetcher _id={crypto.id} width='125px' height='70px' />
            </td>
        </tr>
    );
};

export default CryptoTableBody;