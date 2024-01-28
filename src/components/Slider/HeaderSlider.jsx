import React from 'react';
import Slider from 'react-slick';

import { sliderImgs } from '../../utils/images';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slider.scss';

const HeaderSlider = () => {
    let settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="slider">
            <div className="container">
                <div className="slider-content overflow-x-hidden">
                    <Slider {...settings}>
                        <div className="slider-item">
                            <img src={sliderImgs[0]} alt="somephoto" />
                        </div>
                        <div className="slider-item">
                            <img src={sliderImgs[1]} alt="somephoto" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default HeaderSlider;
