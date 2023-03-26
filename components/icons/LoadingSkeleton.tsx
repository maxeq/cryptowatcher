import React from 'react';

interface LoadingSkeletonProps {
    count: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
    const skeletons = [];

    for (let i = 0; i < count; i++) {
        skeletons.push(
            <div key={i} className="animate-pulse">
                <ol className="text-sm space-y-3">
                    <li className="flex mt-auto items-center h-12">
                        <span className="text-slate-400 mr-5 w-4 h-4 bg-slate-800 rounded"></span>
                        <div className='justify-between flex w-full'>
                            <div className="flex items-center">
                                <div className="bg-slate-800 rounded-xl w-6 h-6 mr-2"></div>
                                <div className="bg-slate-800 rounded w-24 h-4 mr-2"></div>
                                <div className="bg-slate-800 rounded w-8 h-4"></div>
                            </div>
                            <div>
                                <div className="bg-slate-800 rounded w-10 h-4 mr-5"></div>
                            </div>
                        </div>
                    </li>
                </ol >
            </div >
        );
    }

    return (
        <div className="w-full">
            <div className="animate-pulse justify-between flex my-2">
                <div className="flex items-center">
                    <div className="bg-slate-800 rounded-xl w-6 h-6 mr-4"></div>
                    <div className="bg-slate-800 rounded w-28 h-4"></div>
                </div>
                <div>
                    <div className="bg-slate-800 rounded w-12 h-4"></div>
                </div>
            </div>
            {skeletons}
        </div >
    );
};

export default LoadingSkeleton;
