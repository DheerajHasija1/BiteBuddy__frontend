import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { CircularProgress } from '@mui/material';
import './Home.css'
import MultiItemCarousel from './MultiItemCarousel'

const Home = () => {
    const dispatch = useDispatch();
    const { restaurants, loading } = useSelector((store) => store.restaurant);

    useEffect(() => {
        dispatch(getAllRestaurantsAction());
        // dispatch(findCart(jwt));
    }, [dispatch]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center">
            <CircularProgress />
        </div>;
    }

    return (
        <div className=''>
            <section className='banner -z-50 relative flex flex-col justify-center
            items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>BiteBuddy</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Taste the Convenience: Food, Fast and Delivered. </p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'>

                </div>
                <div className='fadout'>

                </div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top
                    Meals</p>
                <MultiItemCarousel />
            </section>
            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'>Order
                From Our Handpicked Favorites</h1>

                <div className='flex flex-wrap items-center justify-around gap-5'>
                {
                restaurants && restaurants.length > 0 ? (
                    restaurants.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))
                ) : (
                    <p>No restaurants available</p>
                )}
                </div>
            </section>
        </div>
    );
};

export default Home;