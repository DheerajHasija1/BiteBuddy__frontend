import React, { useEffect } from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import{fetchRestaurantsOrder} from "../../Component/State/Restaurant Order/Action"
import { Chip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {updateOrderStatus} from "../../Component/State/Restaurant Order/Action"

const  OrderTable =({ currentPage = 0, setCurrentPage = () => {} }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurantOrders,restaurant} =useSelector((store) => store);

   useEffect(() =>{
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId : restaurant.usersRestaurant?.id,
    }))
   },[])

   const handleUpdateOrderStatus  =(orderId,orderStatus) =>{
    dispatch(updateOrderStatus({jwt,orderId,orderStatus}))
   }

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1); // MUI Pagination 1-indexed hai, backend 0-indexed
    }


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
                <TableCell align="left" sx={{py: 1}}>Status</TableCell>
                <TableCell align="right" sx={{py: 1}}>Update Status</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {restaurantOrders?.orders && restaurantOrders.orders.length > 0 ? (
                restaurantOrders?.orders?.map((order) => (
                <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>#{order.id}</TableCell> 
                    <TableCell align="left" sx={{ py: 1 }}>
                                        {order.orderItems?.[0]?.food?.images?.[0] && (
                                            <img
                                                src={order.orderItems[0].food.images[0]}
                                                alt="food"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        )}
                    </TableCell>
                    <TableCell align="left" sx={{py: 1}}>{order.customer?.name}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{order.totalAmount}</TableCell>    
                    <TableCell align="left" sx={{py: 1}}>
                      {order.orderItems?.map((orderItem, index) => (
                                        <div key={orderItem.id || index}>
                                            {orderItem.food?.name || 'N/A'}
                                        </div>
                                    ))} 
                    </TableCell>
                    <TableCell align="left" sx={{py: 1}}>
                       {order.orderItems?.map((item,itemIndex) => (
                                            item.ingredients?.map((ingredient,ingIndex) => (
                                                <Chip
                                                    key={ingredient.id || `${itemIndex}-${ingIndex}`}
                                                    label={ingredient.name || ingredient}
                                                    size="small"
                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                />
                                         ))
                        ))}
                    </TableCell>
                    <TableCell align="left" sx={{py: 1}}>
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
                    <TableCell align="right" sx={{py: 1}}>
                            <Select
                                labelId="demo-simple-select-label"
                                id={`order-status-${order.id}`}
                                value={order.orderStatus}
                                label="Status"
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                size="small"
                            >
                                {["PENDING", "COMPLETED", "OUT_FOR_DELIVERY","DELIVERED"].map((status) => (
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                ))}
                            </Select>
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

        {restaurantOrders?.totalPages > 1 && (
                    <Stack spacing={2} sx={{ p: 2, alignItems: 'center' }}>
                        <Pagination
                            count={restaurantOrders.totalPages}
                            page={currentPage + 1}
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                        />
                        <Typography variant="body2" color="text.secondary">
                            Showing {restaurantOrders.orders?.length || 0} of {restaurantOrders.totalElements || 0} orders
                        </Typography>
                    </Stack>
                )}
        </Card>
    </Box>
    )
}

export default OrderTable;