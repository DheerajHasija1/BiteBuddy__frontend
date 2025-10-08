// import React, { useEffect } from 'react'
// import OrderCard from './OrderCard'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import { getUsersOrders } from '../State/Order/Action';



// const Orders = () => {
//     const {auth,cart,order} = useSelector((store) => store);
//      const navigate = useNavigate();
//     const jwt=localStorage.getItem('jwt');
//     const dispatch = useDispatch();

//     useEffect(() =>{
//         dispatch(getUsersOrders(jwt))
//     },[dispatch, jwt])

//     //loading and error handling
//     if (order.loading) {
//         return <div className="flex justify-center items-center h-screen">Loading orders...</div>;
//     }
    
//     if (order.error) {
//          const errorMessage = typeof order.error === 'string' 
//             ? order.error 
//             : order.error?.message || 'Something went wrong';
//         return <div className="flex justify-center items-center h-screen text-red-500">Error loading orders: {order.error}</div>;
//     }

//     // Check if orders exist and is an array
//     if (!order.orders || !Array.isArray(order.orders)) {
//         return <div className="flex justify-center items-center h-screen">No orders found</div>;
//     }

//     return (
//         <div className='flex items-center flex-col'>
//             <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
//             <div className='space-y-5 w-full lg:w-1/2'>
//             {/* {
//                 order.orders.map((order)=>order.items.map((item) => <OrderCard order={order} item={item} />))
//             } */}

//             {order.orders.length === 0 ? (
//                     <div className="text-center text-gray-500">You haven't placed any orders yet.</div>
//                 ) : (
//                     order.orders.map((orderItem) => 
//                         orderItem.orderItems && Array.isArray(orderItem.orderItems) && orderItem.orderItems.length > 0
//                             ? orderItem.orderItems.map((item, itemIndex) => (
//                                 <OrderCard 
//                                     key={`${orderItem.id}-${item.id || itemIndex}`} 
//                                     order={orderItem} 
//                                     item={item} 
//                                 />
//                               ))
//                             : (
//                                 <div key={orderItem.id} className="text-center text-gray-500">
//                                     Order #{orderItem.id} - No items found
//                                 </div>
//                             )
//                     )
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Orders

import React, { useEffect } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersOrders } from '../State/Order/Action';

const Orders = () => {
    const { auth, cart, order } = useSelector((store) => store);
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersOrders(jwt));
    }, [dispatch, jwt]);

    // Loading and error handling
    if (order.loading) {
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-gray-400">Loading orders...</p>
                </div>
            </>
        );
    }

    if (order.error) {
        const errorMessage = typeof order.error === 'string' 
            ? order.error 
            : order.error?.message || 'Something went wrong';
        return (
            <>
                <div className="flex justify-center items-center h-screen text-red-500">
                    Error loading orders: {errorMessage}
                </div>
            </>
        );
    }

    // Check if orders exist and is an array
    if (!order.orders || !Array.isArray(order.orders)) {
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <p className="text-gray-400">No orders found</p>
                </div>
            </>
        );
    }

    return (
        <>
            {/* ✅ Navbar at the very top */}
            
            {/* Main content container */}
            <div className='min-h-screen bg-black'>
                {/* ✅ Sticky "My Orders" header */}
                <div className='sticky top-0 z-40 bg-black border-b border-gray-800'>
                    <h1 className='text-xl text-center py-7 font-semibold text-white'>
                        My Orders
                    </h1>
                </div>

                {/* ✅ Scrollable order cards */}
                <div className='flex justify-center px-5 py-5'>
                    <div className='space-y-5 w-full lg:w-1/2'>
                        {order.orders.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                                You haven't placed any orders yet.
                            </div>
                        ) : (
                            order.orders.map((orderItem) => 
                                orderItem.orderItems && Array.isArray(orderItem.orderItems) && orderItem.orderItems.length > 0
                                    ? orderItem.orderItems.map((item, itemIndex) => (
                                        <OrderCard 
                                            key={`${orderItem.id}-${item.id || itemIndex}`} 
                                            order={orderItem} 
                                            item={item} 
                                        />
                                    ))
                                    : (
                                        <div 
                                            key={orderItem.id} 
                                            className="text-center text-gray-500 py-4"
                                        >
                                            Order #{orderItem.id} - No items found
                                        </div>
                                    )
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;
