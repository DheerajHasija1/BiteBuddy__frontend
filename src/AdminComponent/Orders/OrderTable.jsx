import React, { useEffect } from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import{fetchRestaurantsOrder} from "../../Component/State/Restaurant Order/Action"
import { Chip } from '@mui/material';
//5.58.01

const  OrderTable =() => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurantOrder,restaurant} =useSelector((store) => store);

   useEffect(() =>{
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId : restaurant.usersRestaurant?.id,
    }))
   },[])

    return (
    <Box>
        <Card sx={{mt: 0}}> 
        <CardHeader 
            title={"All Orders"} 
            sx={{pt: 1, pb: 1, alignItems:"center"}} 
        />
        
        <TableContainer component={Paper} sx={{boxShadow: 0}}> 
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align="left" sx={{py: 1}}>Id</TableCell> 
                <TableCell align="left" sx={{py: 1}}>Image</TableCell>
                <TableCell align="left" sx={{py: 1}}>Customer</TableCell>
                <TableCell align="left" sx={{py: 1}}>Price</TableCell>
                <TableCell align="left" sx={{py: 1}}>Name</TableCell>
                <TableCell align="left" sx={{py: 1}}>Ingredients</TableCell>
                <TableCell align="right" sx={{py: 1}}>Status</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {restaurantOrder?.orders && restaurantOrder.orders.length > 0 ? (
                restaurantOrder.orders.map((order) => (
                <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>#{order.id}</TableCell> 
                    <TableCell align="left" sx={{ py: 1 }}>
                                        {order.items && order.items[0]?.food?.images[0] && (
                                            <img
                                                src={order.items[0].food.images[0]}
                                                alt="food"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        )}
                    </TableCell>
                    <TableCell align="left" sx={{py: 1}}>{order.customer?.fullname}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{order.totalAmount}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>
                      {order.items.map((orderItem) => (
                                            <div>
                                                {orderItem.food?.name || 'N/A'}
                                            </div>
                                        ))}
                    </TableCell>
                    <TableCell align="left" sx={{py: 1}}>
                       {order.items.map((item) => (
                                            item.ingredients?.map((ingredient) => (
                                                <Chip
                                                    key={ingredient.id}
                                                    label={ingredient.name || ingredient}
                                                    size="small"
                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                />
                                         ))
                        ))}
                    </TableCell>
                    <TableCell align="right" sx={{py: 1}}>
                                        <Chip
                                            label={order.orderStatus || 'PENDING'}
                                            color={
                                                order.orderStatus === 'COMPLETED' ? 'success' :
                                                order.orderStatus === 'PENDING' ? 'warning' :
                                                'default'
                                            }
                                            size="small"
                                        />
                    </TableCell>
                </TableRow>))
                ) :(
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        No orders found
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer>
        </Card>
    </Box>
    )
}

export default OrderTable;