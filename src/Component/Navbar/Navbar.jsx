import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import './Navbar.css';
import {pink} from '@mui/material/colors';
import { getUser } from '../State/Authentication/Action';
import { findCart } from '../State/Cart/Action';

const Navbar = () => {
  const {auth, cart} = useSelector((store)=>store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("jwt") && !auth.user) {
      dispatch(getUser());
    }
  }, [auth.user, dispatch]);

  const handleAvatarClick = () => {
    const jwt = localStorage.getItem("jwt");
    
    if (!jwt) {
      navigate("/account/login");
      return;
    }

    navigate("/my-profile");
  }

  return (
    <div className='px-5 z-50 py-[.5rem] bg-[#e91e63] lg:px-20 flex justify-between items-center'>
      <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
        <li onClick={() => navigate("/") } className='logo font-semibold text-2xl cursor-pointer'> BiteBuddy</li>
      </div>
      <div className='flex items-center space-x-4'>
        <IconButton className="text-white">
          <SearchIcon sx={{fontSize:"1.5rem", color: "white"}} />
        </IconButton>
        <IconButton onClick={() => navigate("/cart")}>
          <Badge color="primary" badgeContent={cart.cart?.items.length || 0}>
            <ShoppingCartIcon sx={{fontSize: "1.5rem", color: "white"}}/>
          </Badge>
        </IconButton>
        <IconButton onClick={handleAvatarClick}>
          {auth.user ? (
            <Avatar sx={{bgcolor:"white", color:pink.A400}}>
              {auth.user?.name?.[0]?.toUpperCase()}
            </Avatar>
          ) : (
            <Person sx={{color: "white"}}/>
          )}
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;