import React from 'react';
import Slider from 'react-slick';

const CustomSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        loop: true,
    };

    return (
        <div className="bg-slate-700 p-4 rounded-lg">
            <Slider {...settings}>
                <div >
                    <h1>Buy Bitcoin</h1>
                    <p>Test1</p>
                    <p>Widget content goes here</p>
                    <p>Widget content goes here</p>
                </div>
                <div>
                    <h2>Buy ETH</h2>
                    <p>Test2</p>
                    <p>Widget content goes here</p>
                    <p>Widget content goes here</p>
                </div>
                <div>
                    <h2>Buy Crypto</h2>
                    <p>Test3</p>
                    <p>Widget content goes here</p>
                    <p>Widget content goes here</p>
                </div>
            </Slider >
        </div>
    );
};

export default CustomSlider;
