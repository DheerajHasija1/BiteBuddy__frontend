import React from 'react'
import { Card } from '@mui/material';


export const OrderCard = ({item,order}) => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src={item.food?.images?.[0]}
          alt=""
        />
        <div>
          <p>{item.food.name}</p>
          <p>₹{item.totalPrice}</p>
          {/* <p>₹{item.totalAmount}</p> */}
        </div>
      </div>
      <div>
        <button  className='cursor-pointer rounded-md bg-red-500 text-white py-1 px-3'>{order.orderStatus}</button>
      </div>
    </Card>
  );
};
export default OrderCard;

