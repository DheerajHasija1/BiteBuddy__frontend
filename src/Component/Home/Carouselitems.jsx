import React from "react";

const CarouselItem = ({image,title}) => {
return (
    <div className='flex flex-col justify-center items-center px-2'>
        <img className='w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center' src={image} alt={title} />
        <span className='py-3 sm:py-5 font-semibold text-base sm:text-xl text-gray-400'>{title}</span>
    </div>
)
}
export default CarouselItem