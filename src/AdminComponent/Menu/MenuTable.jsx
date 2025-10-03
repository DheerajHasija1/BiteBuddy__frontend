import React from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'


const orders = [
  {
    image: "image",
    customer: "bitebuddy@gmail.com", 
    price: "₹500",
    name: "pizza",
    ingredients: "ingredients"
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

const  MenuTable =() => {
  const navigate = useNavigate();

    return (
    <Box>
        <Card sx={{mt: 0}}> 
        <CardHeader 
             action={
          <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label="settings">
            <CreateIcon />
          </IconButton>
            }

            title={"Menu"} 
            sx={{pt: 1, pb: 1, alignItems:"center"}} 
        />
        
        
        <TableContainer component={Paper} sx={{boxShadow: 0}}> 
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow> 
                <TableCell align="left" sx={{py: 1}}>Image</TableCell>
                <TableCell align="right" sx={{py: 1}}>Title</TableCell>
                <TableCell align="right" sx={{py: 1}}>Ingredients</TableCell>
                <TableCell align="right" sx={{py: 1}}>Price</TableCell>
                <TableCell align="right" sx={{py: 1}}>Availability</TableCell>
                <TableCell align="right" sx={{py: 1}}>Delete</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {orders.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="right" sx={{py: 1}}>{row.image}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.customer}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.price}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>{row.name}</TableCell>
                    <TableCell align="right" sx={{py: 1}}>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Card>
    </Box>
    )
}

export default MenuTable;