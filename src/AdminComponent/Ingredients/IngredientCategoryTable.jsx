import React, { useEffect } from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,primary } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import Modal from '@mui/material/Modal';
import CreateIngredientCategoryForm from '../Ingredients/CreateIngredientCategoryForm'
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory } from '../../Component/State/Ingredients/Action';

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

const  IngredientCategoryTable =() => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const {restaurant,ingredients} = useSelector(store=>store);
    const jwt = localStorage.getItem("jwt");

    useEffect(() =>{
        dispatch(getIngredientCategory({id:restaurant.usersRestaurant.id,jwt}))
    },[])
    return ( 
    <Box>
        <Card sx={{mt: 0}}> 
        <CardHeader 
             action={
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
            }

            title={"Ingredient Category"} 
            sx={{pt: 1, pb: 1, alignItems:"center"}} 
        />
        
        
        <TableContainer component={Paper} sx={{boxShadow: 0}}> 
            <Table aria-label="simple table">
            <TableHead>
                <TableRow> 
                <TableCell align="left" sx={{py: 1}}>Id</TableCell>
                <TableCell align="left" sx={{py: 1}}>Name</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {ingredients.category.map((category) => (
                    <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>{category.id}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{category.name}</TableCell>
                </TableRow>))}
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
                <CreateIngredientCategoryForm/>
            </Box>
        </Modal>
    </Box>
    )
}

export default IngredientCategoryTable;