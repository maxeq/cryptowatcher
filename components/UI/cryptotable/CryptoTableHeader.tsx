import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoInformationCircle } from "react-icons/io5";

type TableHeaderProps = {
    handleSort: (sortKey: string) => void;
    sortKey: string;
    sortDirection: string;
};

const CryptoTableHeader: React.FC<TableHeaderProps> = ({ handleSort, sortKey, sortDirection }) => {

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
        <tr className={`table-header`}>
            <th className="th-rank hidden md:table-cell table__start sticky z-0 backdrop-opacity-0 cursor-pointer" onClick={() => handleSort('market_cap_rank')}>
                <div className="h-full w-full flex items-center justify-center">
                    #
                </div>
            </th>
            <th className="th-name table__start sticky z-0 backdrop-opacity-0 cursor-pointer" onClick={() => handleSort('name')}>
                Name
            </th>
            <th className="th-price table__end whitespace-nowrap text-right" onClick={() => handleSort('current_price')}>
                <div className="flex items-center justify-end cursor-pointer">
                    {renderSortIcon('current_price')} Price (USD)
                </div>
            </th>
            <th className="th-change table__end" onClick={() => handleSort('price_change_percentage_1h_in_currency')}>
                <div className="flex items-center justify-end cursor-pointer">{renderSortIcon('price_change_percentage_1h_in_currency')}1h %</div>
            </th>
            <th className="th-change table__end" onClick={() => handleSort('price_change_percentage_24h')}>
                <div className="flex items-center justify-end cursor-pointer">{renderSortIcon('price_change_percentage_24h')}24h %</div>
            </th>
            <th className="th-change table__end" onClick={() => handleSort('price_change_percentage_7d_in_currency')}>
                <div className="flex items-center justify-end cursor-pointer">{renderSortIcon('price_change_percentage_7d_in_currency')}7d %</div>
            </th>
            <th className="th-marketcap table__end" onClick={() => handleSort('market_cap')}>
                <div className="flex items-center justify-end cursor-pointer">
                    {renderSortIcon('market_cap')}
                    <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleSort('market_cap')}>
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
            <th className="th-volume table__end" onClick={() => handleSort('total_volume')}>
                <div className="flex items-center justify-end">
                    {renderSortIcon('total_volume')}

                    <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleSort('total_volume')}>
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
            <th className="th-supply table__end" onClick={() => handleSort('circulating_supply')}>
                <div className="flex items-center justify-end">
                    {renderSortIcon('circulating_supply')}

                    <div className="relative inline-flex items-center cursor-pointer" onClick={() => handleSort('circulating_supply')}>
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
            <th className="th-chart table__end">Last 7 days</th>
        </tr>
    );
}

export default CryptoTableHeader;