import React from 'react';
import SliderTemp from './SliderTemp';
import Slider from 'react-slick';
import { BsFire } from 'react-icons/bs';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

interface SliderDataProps {
    sliderTypes: string[];
}

const SliderData: React.FC<SliderDataProps> = ({ sliderTypes }) => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: sliderTypes.length - 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 10000,
    };

    const renderSliders = () => {
        return sliderTypes.map((sliderType, index) => {
            if (sliderType === 'trending') {
                return (
                    <SliderTemp
                        key={`trending-${index}`}
                        url="/api/coins/dataWidgetRedis?param=price_change_percentage_1h_in_currency&order=desc&limit=3"
                        title="Trending"
                        icon={BsFire}
                        iconClassName="text-yellow-400"
                        priceKey="price_change_percentage_1h_in_currency"
                    />
                );
            } else if (sliderType === 'biggestLosers') {
                return (
                    <SliderTemp
                        key={`biggestLosers-${index}`}
                        url="/api/coins/dataWidgetRedis?param=price_change_percentage_24h&order=asc&limit=3"
                        title="Biggest Losers"
                        icon={FiTrendingDown}
                        iconClassName="text-rose-400"
                        priceKey="price_change_percentage_24h"
                    />
                );
            } else if (sliderType === 'topGainers') {
                return (
                    <SliderTemp
                        key={`topGainers-${index}`}
                        url="/api/coins/dataWidgetRedis?param=market_cap_change_percentage_24h&order=desc&limit=3"
                        title="Top Gainers"
                        icon={FiTrendingUp}
                        iconClassName="text-lime-400"
                        priceKey="price_change_percentage_24h"
                    />
                );
            } else {
                return null;
            }
        });
    };

    return (
        <div className="bg-slate-600/50 rounded-lg p-4 px-7 shadow-lg border border-slate-700 mb-5">
            <Slider {...settings}>
                {renderSliders()}
            </Slider>
        </div>
    );
};

export default SliderData;