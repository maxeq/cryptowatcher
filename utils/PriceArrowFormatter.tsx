import React from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const TextColorChange = (value: number) =>
    value < 0 ? 'text-rose-300' : 'text-lime-300';

const classPriceChangeIcon = (value: number) =>
    value < 0 ? <IoMdArrowDropdown /> : <IoMdArrowDropup />;

const formatPercent = (value: number) => {
    const absValue = Math.abs(value);
    return `${absValue.toFixed(2)}%`;
};

interface PriceChangeProps {
    value: number;
    disableColor?: boolean;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, disableColor = false }) => {
    const textColorClass = disableColor ? '' : TextColorChange(value);
    const icon = classPriceChangeIcon(value);
    const formattedValue = formatPercent(value);

    return (
        <div className={`flex items-center space-x-1 ${textColorClass} justify-end`}>
            {icon}
            <span>{formattedValue}</span>
        </div>
    );
};

export default PriceChange;
