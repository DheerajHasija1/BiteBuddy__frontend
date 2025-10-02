import React from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'


const orders = [
  {
    id: 1,
    image: "image",
    customer: "bitebuddy@gmail.com", 
    price: "₹500",
    name: "pizza",
    ingredients: "ingredients",
    status: "Completed"
  }
]

const rows = [
  {
    name: "Dessert (100g serving)",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0
  }
]

const  OrderTable =() => {
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
                <TableCell sx={{py: 1}}>Id</TableCell> 
                <TableCell align="right" sx={{py: 1}}>Image</TableCell>
                <TableCell align="right" sx={{py: 1}}>Customer</TableCell>
                <TableCell align="right" sx={{py: 1}}>Price</TableCell>
                <TableCell align="right" sx={{py: 1}}>Name</TableCell>
                <TableCell align="right" sx={{py: 1}}>Ingredients</TableCell>
                <TableCell align="right" sx={{py: 1}}>Status</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {orders.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{py: 1}}>{row.id}</TableCell> 
                    <TableCell align="right" sx={{py: 1}}>{row.image}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.customer}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.price}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.name}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.ingredients}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.status}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Card>
    </Box>
    )
}

export default OrderTable;