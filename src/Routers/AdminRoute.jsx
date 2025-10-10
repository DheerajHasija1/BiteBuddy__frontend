import React, { useEffect, useState } from 'react'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../AdminComponent/Admin/Admin'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurantByUserId } from '../Component/State/Restaurant/Action'
import { CircularProgress, Box } from '@mui/material'

export const AdminRoute = () => {
  const { restaurant, auth } = useSelector(store => store);
  const dispatch = useDispatch();
  // const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    
    if (jwt) {
      dispatch(getRestaurantByUserId(jwt));
      // setIsInitialLoad(false);
    }
  }, []);

  // if (isInitialLoad && restaurant.loading) {
  //   return (
  //     <Box 
  //       sx={{ 
  //         display: 'flex', 
  //         justifyContent: 'center', 
  //         alignItems: 'center', 
  //         minHeight: '100vh' 
  //       }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // ✅ Data aane ke baad check karo restaurant exists ya nahi
  const hasRestaurant = restaurant.usersRestaurant !== null && 
                        restaurant.usersRestaurant !== undefined;

  return (
    <Routes>
      <Route 
        path="/*" 
        element={hasRestaurant ? <Admin /> : <CreateRestaurantForm />}
      />
    </Routes>
  )
}
