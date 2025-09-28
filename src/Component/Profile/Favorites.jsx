import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useSelector } from 'react-redux';

const Favorites = () => {
    const { auth } = useSelector((state) => state);
    
    return (
        <div>
            <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
            <div className='flex flex-wrap gap-4 justify-center'>
                {/* ✅ Check if user exists and has favorites */}
                {auth.user?.favorites?.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                ))}
                
                {/* ✅ Show message if no favorites */}
                {(!auth.user?.favorites || auth.user.favorites.length === 0) && (
                    <div className="text-center text-gray-500 py-10">
                        <p>No favorites added yet!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites;
