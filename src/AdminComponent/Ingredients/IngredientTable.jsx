import React from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIngredientForm from './CreateIngredientForm';
import Modal from '@mui/material/Modal';


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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const  IngredientTable =() => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <Box>
        <Card sx={{mt: 0}}> 
        <CardHeader 
             action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
            }

            title={"Ingredients"} 
            sx={{pt: 1, pb: 1, alignItems:"center"}} 
        />
        
        
        <TableContainer component={Paper} sx={{boxShadow: 0}}> 
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow> 
                <TableCell align="left" sx={{py: 1}}>Id</TableCell>
                <TableCell align="left" sx={{py: 1}}>Name</TableCell>
                <TableCell align="left" sx={{py: 1}}>Category</TableCell>
                <TableCell align="left" sx={{py: 1}}>Availability</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {orders.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>{"image"}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{"price"}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{"pizza"}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{"yes"}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Card>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
                <CreateIngredientForm/>
          </Box>
        </Modal>
    </Box>
    )
}

export default IngredientTable;