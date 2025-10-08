import React from 'react';
import { Card, Chip } from '@mui/material';

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return {
        bgcolor: '#e91e63', 
        color: 'white'
      };
    case 'COMPLETED':
      return {
        bgcolor: '#4caf50', 
        color: 'white'
      };
    case 'OUT_FOR_DELIVERY':
      return {
        bgcolor: '#ff9800', 
        color: 'white'
      };
    case 'DELIVERED':
      return {
        bgcolor: '#2196f3',  
        color: 'white'
      };
    default:
      return {
        bgcolor: '#757575',  
        color: 'white'
      };
  }
};


const formatStatusText = (status) => {
  if (!status) return 'Unknown';
  return status.replace(/_/g, ' '); 
};

export const OrderCard = ({ item, order }) => {

  const statusStyle = getStatusColor(order.orderStatus);

  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16 object-cover rounded"
          src={item.food?.images?.[0]}
          alt={item.food?.name || 'Food item'}
        />
        <div>
          <p className="font-medium">{item.food?.name}</p>
          <p className="text-gray-400">₹{item.totalPrice}</p>
        </div>
      </div>
      <div>
        <Chip
          label={formatStatusText(order.orderStatus)}
          sx={{
            bgcolor: statusStyle.bgcolor,
            color: statusStyle.color,
            fontWeight: 600,
            textTransform: 'capitalize',
            px: 1
          }}
        />
      </div>
    </Card>
  );
};

export default OrderCard;
