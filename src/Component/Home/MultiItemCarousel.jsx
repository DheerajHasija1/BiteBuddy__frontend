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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
        {
            breakpoint: 1536, // 2xl screens
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1280, // xl screens
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1024, // lg screens (tablets landscape)
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768, // md screens (tablets)
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 640, // sm screens (large phones)
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480, // xs screens (small phones)
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
