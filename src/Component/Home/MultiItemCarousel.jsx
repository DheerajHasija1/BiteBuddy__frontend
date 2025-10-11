import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from "./Carouselitems";
import { topMeals } from "./topMeal";

const MultiItemCarousel = () => {
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,  // Default for desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
        {
            breakpoint: 1280,  // Below 1280px
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1024,  // Below 1024px (tablets)
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,  // Below 768px
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,  // Below 480px (mobile)
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};
    return (
        <div>
            <Slider {...settings}>
                {topMeals.map((item) => (
                    <CarouselItem image={item.image} title={item.title} />
                ))}
            </Slider>
        </div>
    );
}
export default MultiItemCarousel;
