import React, { useEffect } from 'react'
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getMenuItemsByRestaurantId,getAllMenuItemsByRestaurantId,updateMenuItemsAvailability,deleteFoodAction} from "../../Component/State/Menu/Action"
import { Chip } from '@mui/material';

const  MenuTable =() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {restaurant,ingredients,menu} = useSelector(store=>store);
  const jwt = localStorage.getItem("jwt");

  // useEffect(() =>{
  //   dispatch(getMenuItemsByRestaurantId({
  //     restaurantId :restaurant.usersRestaurant.id,
  //     jwt
  // }))
  // },[])

  useEffect(() =>{
    dispatch(getAllMenuItemsByRestaurantId({jwt}))
  },[menu.menuItems.length])

  const handleAvailabilityToggle = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  const handleDeleteFoodButton=(foodId)=>{
    dispatch(deleteFoodAction({foodId,jwt}));
  }

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
                <TableCell align="left" sx={{py: 1}}>Title</TableCell>
                <TableCell align="left" sx={{py: 1}}>Ingredients</TableCell>
                <TableCell align="left" sx={{py: 1}}>Price</TableCell>
                <TableCell align="left" sx={{py: 1}}>Availability</TableCell>
                <TableCell align="right" sx={{py: 1}}>Delete</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
                {menu.menuItems.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left" sx={{py: 1}}>
                        <img 
                            src={item.images[0]} 
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                    </TableCell>
                    <TableCell align="left" sx={{py: 1}}>{item.name}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{item.ingredients.map((ingredients) => <Chip label={ingredients.name} />)}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>{item.price}</TableCell>
                    <TableCell align="left" sx={{py: 1}}>
                      <Chip 
                          label={item.available ? 'Available' : 'Unavailable'}
                          color={item.available ? 'success' : 'error'}
                          size="small"
                          onClick={() => handleAvailabilityToggle(item.id)}
                          clickable
                      />
                  </TableCell>
                    <TableCell align="right" sx={{py: 1}}>
                        <IconButton color='primary'>
                            <DeleteIcon  onClick={() => handleDeleteFoodButton(item.id)}/>
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