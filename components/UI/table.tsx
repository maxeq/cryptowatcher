import React, { useState, CSSProperties, ReactNode } from 'react';
import usePagination from '@/lib/usePagination';
import CryptoLoadingSkeleton from './CryptoTableSkeleton';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { IoInformationCircle } from 'react-icons/io5';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/NumberFormatter';
import PriceChange from '@/utils/PriceArrowFormatter';
import ChartFetcher from '../charts/ChartFetcher';


type DataRow = {
    id: string;
    dbDateAdded: Date;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: Date;
    atl: number;
    atl_change_percentage: number;
    atl_date: Date;
    roi?: object | null;
    last_updated: Date;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_30d_in_currency: number;
    price_change_percentage_7d_in_currency: number;
};


type TableComponentProps = {
    data: DataRow[];
    onItemsRendered: any;
    ref: any;
    onHeaderClick: (sortKey: string) => void;
    sortKey: string;
    sortDirection: string;
};

type TableHeaderProps = {
    onHeaderClick: (sortKey: string) => void;
    sortKey: string;
    sortDirection: string;
};

const TableHeader: React.FC<TableHeaderProps> = ({ onHeaderClick, sortKey, sortDirection }) => {

    //sort icon
    const renderSortIcon = (currentSortKey: string) => {
        if (sortKey !== currentSortKey) return null;

        return (
            <span className="ml-2">
                {sortDirection === 'asc' ? (
                    <FiChevronUp size={16} />
                ) : (
                    <FiChevronDown size={16} />
                )}
            </span>
        );
    };

    // tooltips
    const [showTooltip, setShowTooltip] = useState(false);
    const handleMouseEnter = () => {
        setShowTooltip(true);
    };
    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const [showTooltipVolume, setShowTooltipVolume] = useState(false);
    const handleMouseEnterVolume = () => {
        setShowTooltipVolume(true);
    };
    const handleMouseLeaveVolume = () => {
        setShowTooltipVolume(false);
    };

    const [showTooltipCirc, setShowTooltipCirc] = useState(false);
    const handleMouseEnterCirc = () => {
        setShowTooltipCirc(true);
    };
    const handleMouseLeaveCirc = () => {
        setShowTooltipCirc(false);
    };

    return (
        <thead className="table-header_table h-10 flex items-center">
            <tr className="">
                <th className="th-rank_table hidden md:table-cell table__start_table backdrop-opacity-0 cursor-pointer" onClick={() => onHeaderClick('market_cap_rank')}>
                    <div className="h-full w-full flex items-center justify-center">
                        #
                    </div>
                </th>
                <th className="th-name_table table__start_table backdrop-opacity-0 cursor-pointer" onClick={() => onHeaderClick('name')}>
                    Name
                </th>
                <th className="th-price_table table__end_table whitespace-nowrap text-right" onClick={() => onHeaderClick('current_price')}>
                    <div className="flex items-center justify-end cursor-pointer">
                        {renderSortIcon('current_price')} Price (USD)
                    </div>
                </th>
                <th className="th-change_table table__end_table" onClick={() => onHeaderClick('price_change_percentage_1h_in_currency')}>
                    <div className="flex items-center justify-end cursor-pointer">{renderSortIcon('price_change_percentage_1h_in_currency')}1h %</div>
                </th>
                <th className="th-change_table table__end_table" onClick={() => onHeaderClick('price_change_percentage_24h')}>
                    <div className="flex items-center justify-end cursor-pointer">{renderSortIcon('price_change_percentage_24h')}24h %</div>
                </th>
                <th className="th-change_table table__end_table" onClick={() => onHeaderClick('price_change_percentage_7d_in_currency')}>
                    <div className="flex items-center justify-end cursor-pointer">{renderSortIcon('price_change_percentage_7d_in_currency')}7d %</div>
                </th>
                <th className="th-marketcap_table table__end_table" onClick={() => onHeaderClick('market_cap')}>
                    <div className="flex items-center justify-end cursor-pointer">
                        {renderSortIcon('market_cap')}
                        <div className="relative inline-flex items-center cursor-pointer" onClick={() => onHeaderClick('market_cap')}>
                            Market Cap
                            <div
                                className="ml-1"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                                {showTooltip && (
                                    <div className="space-y-1 hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-4 leading-relaxed normal-case text-left w-80 h-auto left-1/2 transform -translate-x-1/2">
                                        The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
                                        <br></br><br></br>
                                        Market Cap = Current Price x Circulating Supply.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </th>
                <th className="th-volume_table table__end_table" onClick={() => onHeaderClick('total_volume')}>
                    <div className="flex items-center justify-end">
                        {renderSortIcon('total_volume')}
                        <div className="relative inline-flex items-center cursor-pointer" onClick={() => onHeaderClick('total_volume')}>
                            Volume (24h)
                            <div
                                className="ml-1"
                                onMouseEnter={handleMouseEnterVolume}
                                onMouseLeave={handleMouseLeaveVolume}
                            >
                                <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                                {showTooltipVolume && (
                                    <div className="space-y-1 hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-4 leading-relaxed normal-case text-left w-80 h-auto left-1/2 transform -translate-x-1/2">
                                        A measure of how much of a cryptocurrency was traded in the last 24 hours.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </th>
                <th className="th-supply_table table__end_table" onClick={() => onHeaderClick('circulating_supply')}>
                    <div className="flex items-center justify-end">
                        {renderSortIcon('circulating_supply')}

                        <div className="relative inline-flex items-center cursor-pointer" onClick={() => onHeaderClick('circulating_supply')}>
                            Circulating Supply
                            <div
                                className="ml-1"
                                onMouseEnter={handleMouseEnterCirc}
                                onMouseLeave={handleMouseLeaveCirc}
                            >
                                <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                                {showTooltipCirc && (
                                    <div className="space-y-1 hidden md:block absolute bg-slate-900 text-slate-300 text-xs rounded-lg py-2 pl-4 pr-4 leading-relaxed normal-case text-left w-80 h-auto left-1/2 transform -translate-x-1/2">
                                        The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </th>
                <th className="th-chart_table table__end_table">Last 7 days</th>
            </tr>
        </thead>

    );
};

const TableComponent: React.FC<TableComponentProps> = ({ data, onItemsRendered, ref, onHeaderClick }) => {
    const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
        const rowData = data[index];
        // tooltips for bar
        const [showTooltipx, setShowTooltipx] = useState<Record<number, boolean>>({});

        const handleTooltipVisibility = (index: any, visible: any) => {
            setShowTooltipx((prev) => ({ ...prev, [index]: visible }));
        };
        return (

            <tr key={rowData.id} className="border-t-[#333] border border-b-0 border-l-0 border-r-0 md:hover:bg-[hsla(200,2%,67%,.1)] " style={{ ...style, display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <td className="th-rank_table hidden md:table-cell table__start_table backdrop-opacity-0">
                    <td className="h-full w-full flex items-center justify-center">
                        {rowData.market_cap_rank}
                    </td>
                </td>
                <td className="th-name_table table__start_table backdrop-opacity-0">
                    <div className={`flex items-center mr-5 md:mr-0`}>
                        <Image
                            src={rowData.image}
                            alt={rowData.name}
                            width="32"
                            height="32"
                            className="mr-3"
                        />
                        <Link href={`/cryptocurrencies/${rowData.id}`}>
                            <div className="">
                                <span className="flex flex-col md:flex-items">
                                    <span className="mr-2 whitespace-nowrap">{rowData.name}</span>
                                    <span className="uppercase text-slate-300 text-12px mr-3">
                                        <span className="md:hidden mr-2 bg-slate-700 px-2 py-1 rounded-md text-left">
                                            {rowData.market_cap_rank}</span>{rowData.symbol}</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                </td>
                <td className="th-price_table table__end_table">
                    {formatPrice(rowData.current_price)}
                </td>
                <td
                    className={`th-change_table table__end_table`}>
                    <PriceChange value={rowData.price_change_percentage_1h_in_currency} />
                </td>
                <td
                    className={`th-change_table table__end_table`}>
                    <PriceChange value={rowData.price_change_percentage_24h} />
                </td>
                <td
                    className={`th-change_table table__end_table`}>
                    <PriceChange value={rowData.price_change_percentage_7d_in_currency} />
                </td>
                <td className="th-marketcap_table table__end_table">
                    {formatPrice(rowData.market_cap)}
                </td>
                <td className="th-volume_table table__end_table">
                    <div>
                        {formatPrice(rowData.total_volume)}
                    </div>
                    <div className='text-slate-300 text-12px item-centered flex justify-end whitespace-nowrap'>
                        {formatPrice(rowData.total_volume / rowData.current_price, false)} {rowData.symbol.toUpperCase()}
                    </div>
                </td>
                <td className="th-supply_table table__end_table whitespace-nowrap">
                    {formatPrice(rowData.circulating_supply).replace('$', '')} {rowData.symbol.toUpperCase()}
                    {rowData.max_supply !== 0 && rowData.circulating_supply !== 0 && isFinite(rowData.circulating_supply / rowData.max_supply) ? (
                        <div
                            className="relative w-3/4 h-2 bg-slate-100/50 rounded-full ml-auto"
                            onMouseEnter={() => handleTooltipVisibility(index, true)}
                            onMouseLeave={() => handleTooltipVisibility(index, false)}
                        >
                            <div
                                className="absolute left-0 h-2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                style={{
                                    width: `${((rowData.circulating_supply / rowData.max_supply) * 100).toFixed(0)}%`,
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
                                        <div className="text-slate-200">{((rowData.circulating_supply / rowData.max_supply) * 100).toFixed(0)}%</div>
                                    </div>
                                    <div>
                                        <div
                                            className="relative w-full h-2 bg-slate-500/50 rounded-full"
                                            style={{
                                                width: `${((rowData.circulating_supply / rowData.max_supply) * 100).toFixed(0)}%`,
                                                backgroundSize: '100% 200%',
                                                backgroundPosition: 'left bottom',
                                                transition: 'background-position 0.5s ease-out'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-slate-200 mr-20">Circulating Supply</div>
                                        <div>{formatPrice(rowData.circulating_supply, false)} {rowData.symbol.toUpperCase()}</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-slate-200">Max Supply</div>
                                        <div>{formatPrice(rowData.max_supply, false)} {rowData.symbol.toUpperCase()}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}
                </td>
                <td className={`th-chart_table table__end_table md:pl-7 md:mr-4`} style={{ width: '150px', height: '75px' }}>
                    <ChartFetcher _id={rowData.id} width='125px' height='70px' />
                </td>
            </tr>
        );
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className={`table_table mobile-solid-background w-full justify-evenly border border-b-[#333] border-l-0 border-r-0 border-t-0`}>
                    <thead className="flex min-w-max" style={{}}>
                        <TableHeader
                            onHeaderClick={onHeaderClick}
                            sortKey={""}
                            sortDirection={""}
                        />
                    </thead>
                    <tbody style={{}}>
                        <List
                            height={500}
                            itemCount={data.length}
                            itemSize={70}
                            width={"100%"}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                            className="hide-scrollbar"
                        >
                            {Row}
                        </List>
                    </tbody>
                </table>
            </div>
        </>
    );
};

const MyTableComponent: React.FC = () => {
    const [sortKey, setSortKey] = useState('market_cap_rank');
    const [sortDirection, setSortDirection] = useState('asc');

    // sort
    const onHeaderClick = (newSortKey: string) => {
        if (sortKey === newSortKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(newSortKey);
            setSortDirection('desc');
        }
        setSize(1);
    };

    const { data, size, setSize, isReachedEnd, isLoading, error } = usePagination(
        `/api/coins/getDataRedis`,
        sortKey,
        sortDirection
    );
    console.log('data', data)
    if (!data) {
        return <div>Loading...</div>;
    }

    const flattenedData = data.flatMap(page => page.getdata);
    const itemCount = isReachedEnd ? flattenedData.length : flattenedData.length + 1;
    const loadMoreItems = isReachedEnd ? () => { } : () => setSize(size + 1);
    const isItemLoaded = (index: number) => !isLoading && index < flattenedData.length;

    return (
        <>
            {isLoading ? (
                Array.from({ length: 20 }).map((_, index) => (
                    <CryptoLoadingSkeleton key={index} />
                ))
            ) : (
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                >
                    {({ onItemsRendered, ref }) => (
                        <div style={{ position: 'relative', height: '500px', width: '100%' }}>
                            <TableComponent data={flattenedData} onItemsRendered={onItemsRendered} ref={ref} onHeaderClick={onHeaderClick} sortKey={sortKey} sortDirection={sortDirection} />
                        </div>
                    )}
                </InfiniteLoader>
            )}
        </>
    );
};

export default MyTableComponent;
