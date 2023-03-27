import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <tr className="animate-pulse">
            <th className="table__start sticky z-0 backdrop-opacity-0" style={{ minWidth: '215px' }}>
                <div className="h-full w-full flex items-center justify-center"></div>
            </th>
        </tr>
    );
};

export default SkeletonLoader;
