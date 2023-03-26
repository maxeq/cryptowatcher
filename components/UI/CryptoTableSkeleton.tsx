import React from 'react';
import { IoInformationCircle } from 'react-icons/io5';

interface LoadingSkeletonProps {
    count: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
    const skeletons = [];

    for (let i = 0; i < count; i++) {
        skeletons.push(
            <tr key={i}>
                <td className="hidden md:table-cell table__start sticky z-0 backdrop-opacity-0">
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="bg-gray-600 rounded w-8 h-4 animate-pulse"></div>
                    </div>
                </td>
                <td className="table__start sticky z-0 backdrop-opacity-0">
                    <div className="flex items-center max-w-xs mr-5 md:mr-0 animate-pulse">
                        <div className="bg-gray-600 rounded w-8 h-8 mr-3"></div>
                        <div className="bg-gray-600 rounded w-24 h-4"></div>
                    </div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-16 h-4 animate-pulse"></div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-16 h-4 animate-pulse"></div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-16 h-4 animate-pulse"></div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-16 h-4 animate-pulse"></div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-24 h-4 animate-pulse"></div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-24 h-4 animate-pulse"></div>
                </td>
                <td className="table__end">
                    <div className="bg-gray-600 rounded w-24 h-4 animate-pulse"></div>
                </td>
                <td className="table__end" style={{ width: '150px', height: '75px' }}>
                    <div className="bg-gray-600 rounded w-36 h-20 animate-pulse"></div>
                </td>
            </tr>
        );
    }
    return (
        <div className="overflow-x-auto">
            <table className={`table mobile-solid-background`}>
                <thead>
                    <tr className={`table-header`}>
                        <th className="hidden md:table-cell table__start sticky z-0 backdrop-opacity-0 cursor-pointer">
                            <div className="h-full w-full flex items-center justify-center">
                                #
                            </div>
                        </th>
                        <th className="table__start sticky z-0 backdrop-opacity-0 cursor-pointer">
                            Name
                        </th>
                        <th className="table__end whitespace-nowrap text-right">
                            <div className="flex items-center justify-end cursor-pointer">
                                Price (USD)
                            </div>
                        </th>
                        <th className="table__end">
                            <div className="flex items-center justify-end cursor-pointer">1h %</div>
                        </th>
                        <th className="table__end">
                            <div className="flex items-center justify-end cursor-pointer">24h %</div>
                        </th>
                        <th className="table__end">
                            <div className="flex items-center justify-end cursor-pointer">7d %</div>
                        </th>
                        <th className="table__end">
                            <div className="flex items-center justify-end cursor-pointer">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    Market Cap
                                    <div
                                        className="ml-1"
                                    >
                                        <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className="table__end">
                            <div className="flex items-center justify-end">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    Volume (24h)
                                    <div
                                        className="ml-1"
                                    >
                                        <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className="table__end">
                            <div className="flex items-center justify-end">
                                <div className="relative inline-flex items-center cursor-pointer">
                                    Circulating Supply
                                    <div
                                        className="ml-1"
                                    >
                                        <IoInformationCircle size={18} color="gray" className='md:block hidden ' />
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className="table__end">Last 7 days</th>
                    </tr>

                </thead>

                <tbody>
                    {skeletons}

                </tbody>

            </table>

        </div>

    );
};








export default LoadingSkeleton;
