import React from 'react';
import Slider from 'react-slick';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { BsFire } from 'react-icons/bs';

const CustomSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="bg-slate-700 rounded-lg p-4 px-7 shadow-purple-500 shadow-lg border border-slate-700 hover:shadow-slate-200">
            <Slider {...settings}>
                <div className="">
                    <h2 className="flex items-center justify-between cursor-pointer">
                        <div className="font-bold text-xl flex items-center ">
                            <BsFire className="mr-2 text-yellow-400" />
                            Trending</div>
                        <div className="font-bold text-xs text-teal-400 hover:text-teal-300">More &gt;</div>
                    </h2>
                    <div className="mx-2 py-2">
                        <ol className="text-sm space-y-3 my-3 cursor-pointer">
                            <li className="flex"><span className="text-slate-400 mr-5">1</span>
                                <div className="flex justify-between w-full">
                                    <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                    <div>$0.32</div>
                                </div>
                            </li>
                            <li className="flex"><span className="text-slate-400 mr-5">2</span>
                                <div className="flex justify-between w-full">
                                    <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                    <div>$0.32</div>
                                </div>
                            </li>
                            <li className="flex"><span className="text-slate-400 mr-5">3</span>
                                <div className="flex justify-between w-full">
                                    <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                    <div>$0.32</div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div>
                    <h2 className="flex items-center justify-between">
                        <div className="font-bold text-xl flex items-center ">
                            <FiTrendingUp className="mr-2 text-lime-300" />
                            Top Gainers</div>
                        <div className="font-bold text-xs text-teal-400 hover:text-teal-300">More &gt;</div>
                    </h2>
                    <div className="mx-2 py-2">
                        <ol className="text-sm space-y-3 my-3 cursor-pointer">
                            <li className="flex"><span className="text-slate-400 mr-5">1</span>
                                <div className="flex justify-between w-full">
                                    <div><span className="mr-1 ">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                    <div>$0.32</div>
                                </div>
                            </li>
                            <li className="flex"><span className="text-slate-400 mr-5">2</span>
                                <div className="flex justify-between w-full">
                                    <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                    <div>$0.32</div>
                                </div>
                            </li>
                            <li className="flex"><span className="text-slate-400 mr-5">3</span>
                                <div className="flex justify-between w-full">
                                    <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                    <div>$0.32</div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div>
                    <div className="">
                        <h2 className="flex items-center justify-between ">
                            <div className="font-bold text-xl flex items-center ">
                                <FiTrendingDown className="mr-2 text-rose-300" />
                                Biggest Losers</div>
                            <div className="font-bold text-xs text-teal-400 hover:text-teal-300">More &gt;</div>
                        </h2>
                        <div className="mx-2 py-2">
                            <ol className="text-sm space-y-3 my-3 cursor-pointer">
                                <li className="flex"><span className="text-slate-400 mr-5">1</span>
                                    <div className="flex justify-between w-full">
                                        <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                        <div>$0.32</div>
                                    </div>
                                </li>
                                <li className="flex"><span className="text-slate-400 mr-5">2</span>
                                    <div className="flex justify-between w-full">
                                        <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                        <div>$0.32</div>
                                    </div>
                                </li>
                                <li className="flex"><span className="text-slate-400 mr-5">3</span>
                                    <div className="flex justify-between w-full">
                                        <div><span className="mr-1">Icon</span>Bitcoin<span className="text-slate-400 ml-1">BTC</span></div>
                                        <div>$0.32</div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Slider >
        </div>
    );
};

export default CustomSlider;
