import React from 'react';
import SliderTemp from './SliderTemp';
import Slider from 'react-slick';
import { BsFire } from 'react-icons/bs';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const CustomSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
    };


    return (
        <div className="bg-slate-600/50 rounded-lg p-4 px-7 shadow-lg border border-slate-700 mb-5">
            <Slider {...settings} >
                <SliderTemp url="/api/coins/dataWidget?param=price_change_percentage_24h&order=desc&limit=3" title="Trending" icon={BsFire} iconClassName="text-yellow-400" />
                <SliderTemp url="/api/coins/dataWidget?param=price_change_percentage_24h&order=asc&limit=3" title="Biggest Losers" icon={FiTrendingDown} iconClassName="text-rose-400" />
            </Slider>
        </div >

    );
};

export default CustomSlider;