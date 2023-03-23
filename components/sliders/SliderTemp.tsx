import React from 'react';
import ErrorMessage from '../errorMessage';
import Loader from '../icons/Loader';
import Image from 'next/image';
import useSWR from 'swr';
import PriceArrowFormatter from '@/utils/PriceArrowFormatter';

const fetcher = (url: any) => fetch(url).then(res => res.json());

interface SliderTemplateProps {
    url: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName?: string;
}

const SliderTemplate: React.FC<SliderTemplateProps> = ({ url, title, icon, iconClassName }) => {
    const { data, isLoading, error } = useSWR(url, fetcher,
        {
            revalidateOnMount: true,
            dedupingInterval: 5000, // Cache for 5 minutes
        }
    );

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (isLoading) {
        return <Loader />;
    }

    const IconComponent = icon;

    return (

        <div className="mb-5">
            <h2 className="flex items-center justify-between cursor-pointer mb-3">
                <div className="font-bold text-xl flex items-center">
                    <IconComponent className={`mr-2 ${iconClassName}`} />
                    {title}</div>
                <div className="font-bold text-xs text-teal-400 hover:text-teal-300">More &gt;</div>
            </h2>
            {data.getdata.map
                ((crypto: any, index: number) => (
                    <div key={crypto._id} className="">

                        <div className="mx-2 py-2">
                            <ol className="text-sm space-y-3 cursor-pointer">
                                <li className="flex mt-auto"><span className="text-slate-400 mr-5">{index + 1}</span>
                                    <div className="flex justify-between w-full">
                                        <div className="flex items-center">
                                            <span className="mr-1 flex items-center">
                                                <Image
                                                    src={crypto.image}
                                                    alt={crypto.name}
                                                    width={24}
                                                    height={24}
                                                    className="mr-2 rounded-xl"
                                                /></span>
                                            <span className="flex items-center"> {crypto.name}</span>
                                            <span className="text-slate-400 ml-1 uppercase">{crypto.symbol}</span>
                                        </div>
                                        <div className="mr-2"><PriceArrowFormatter value={crypto.price_change_percentage_24h} /></div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                ))
            }
        </div >
    );
};


export default SliderTemplate;