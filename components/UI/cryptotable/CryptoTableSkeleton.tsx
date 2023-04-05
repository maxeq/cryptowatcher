import React from 'react';

const CryptoLoadingSkeleton = () => {
    return (
        <tr className="">
            <td className="th-rank hidden md:table-cell table__start sticky z-0 backdrop-opacity-0">
                <div className="h-full w-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-300/10 rounded animate-pulse"></div>
                </div>
            </td>
            <td className="p-[23px] th-name table__start sticky z-0 backdrop-opacity-0">
                <div className="flex items-center mr-5 md:mr-0">
                    <div className="w-8 h-8 bg-gray-300/10 rounded mr-3 animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-300/10 rounded animate-pulse"></div>
                </div>
            </td>
            <td className="th-price table__end">
                <div className="w-24 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-change table__end">
                <div className="ml-16 w-10 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-change table__end">
                <div className="ml-16 w-10 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-change table__end">
                <div className="ml-16 w-10 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-marketcap table__end">
                <div className="ml-16 w-28 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-volume table__end">
                <div className="ml-10 w-28 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-supply table__end">
                <div className="ml-10 w-28 h-4 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
            <td className="th-chart table__end" style={{ width: '150px', height: '75px' }}>
                <div className="ml-10 w-28 h-10 bg-gray-300/10 rounded animate-pulse"></div>
            </td>
        </tr>
    );
};

export default CryptoLoadingSkeleton;
