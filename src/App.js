import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import { DarkTheme } from './Theme/DarkTheme';
import CustomerRoute from './Routers/CustomerRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Component/State/Authentication/Action';
import { Routes, Route, Router } from "react-router-dom";
import RestaurantDetails from "./Component/Restaurant/RestaurantDetails";
import { findCart } from './Component/State/Cart/Action';
import Routers from './Routers/Routers';
import { getRestaurantByUserId } from './Component/State/Restaurant/Action';


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart({jwt}));
    }
  }, [auth.jwt, dispatch, jwt]);

  // useEffect(() =>{
  // dispatch(getRestaurantByUserId(auth.jwt || jwt))
  // },[auth.user])

  useEffect(() => {
    // Fetch user profile
    dispatch(getUser(jwt));
  
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
        dispatch(getRestaurantByUserId(jwt))
            .catch((error) => {
                console.log("No restaurant found yet (new user):", error);
            });
    }
    
    dispatch(findCart(jwt));
}, [auth.jwt]);

  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  );
}

export default App;