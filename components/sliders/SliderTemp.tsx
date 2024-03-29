import React from 'react';
import ErrorMessage from '../errorMessage';
import Loader from '../icons/Loader';
import Image from 'next/image';
import useSWR from 'swr';
import PriceArrowFormatter from '@/utils/PriceArrowFormatter';
import Link from 'next/link';
import LoadingSkeleton from '../icons/LoadingSkeleton';

const fetcher = (url: any) => fetch(url).then(res => res.json());

interface SliderTemplateProps {
    url: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName?: string;
    priceKey: string;
}

const SliderTemplate: React.FC<SliderTemplateProps> = ({ url, title, icon, iconClassName, priceKey }) => {
    const { data, isLoading, error } = useSWR(url, fetcher,
    );

    if (error) {
        return <LoadingSkeleton count={3} />;
    }

    if (isLoading) {
        return <LoadingSkeleton count={3} />;
    }

    const IconComponent = icon;

    return (
        <div>
            <h2 className="flex items-center justify-between cursor-pointer mb-3">
                <div className="font-bold text-xl flex items-center">
                    <IconComponent className={`mr-4 ${iconClassName}`} />
                    {title}
                </div>
                <div className="font-bold text-xs text-teal-400 hover:text-teal-300">
                    More &gt;
                </div>
            </h2>
            {data.getdata.map((crypto: any, index: number) => (
                <div key={crypto._id} className="">
                    <div className="mx-2 py-2">
                        <Link href={`/cryptocurrencies/${crypto.id}`}>
                            <ol className="text-sm space-y-3 ">
                                <li className="flex">
                                    <span className="text-slate-400 mr-5 ">{index + 1}</span>
                                    <div className="flex justify-between w-full ">
                                        <div className="flex items-center ">
                                            <span className="mr-2 flex items-center ">
                                                <div className="w-8 h-8 overflow-hidden ">
                                                    <Image
                                                        src={crypto.image}
                                                        alt={crypto.name}
                                                        width={24}
                                                        height={24}
                                                        className="rounded-3xl"
                                                    />
                                                </div>
                                            </span>
                                            <span className="flex items-center"> {crypto.name}</span>
                                            <span className="text-slate-400 ml-2 uppercase">
                                                {crypto.symbol}
                                            </span>
                                        </div>
                                        <div className="mr-2">
                                            <PriceArrowFormatter value={crypto[priceKey]} />
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

};


export default SliderTemplate;