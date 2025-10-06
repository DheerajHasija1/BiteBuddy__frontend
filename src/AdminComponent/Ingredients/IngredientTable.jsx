import React ,{useEffect}from 'react'
import { Box, Card, CardHeader, Table, TableBody, Button  ,TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import CreateIngredientForm from './CreateIngredientForm';
import Modal from '@mui/material/Modal';
import {getIngredientsOfRestaurant, updateStockOfIngredient} from "../../Component/State/Ingredients/Action"
import { useDispatch,useSelector } from 'react-redux';

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
        const dispatch = useDispatch();
        const {restaurant,ingredients} = useSelector(store=>store);
        const jwt = localStorage.getItem("jwt");
    
        useEffect(() =>{
            dispatch(getIngredientsOfRestaurant({id:restaurant.usersRestaurant.id,jwt}))
        },[])

        const handleUpdateStock=(id)=>{
          dispatch(updateStockOfIngredient({id,jwt}));
        }
        
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
                {ingredients.ingredients.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>{item.id}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{item.name}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{item.category?.name || "-"}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>
                      <Button onClick={() =>handleUpdateStock(item.id)}>{item.inStock ? "InStock":"Out Of Stock"}</Button>
                    </TableCell>
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