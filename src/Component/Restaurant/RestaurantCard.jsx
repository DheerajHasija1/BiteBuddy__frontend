import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToFavorites } from '../State/Restaurant/Action';
import { isPresentInFavorites } from "../Config/logic";


const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!item) return null;

  const displayImage = item?.images && item.images.length > 0 
    ? item.images[0] 
    : "https://via.placeholder.com/300x200";

  const handleFavoriteClick = () => {
    if (!jwt) {
      navigate('/login');
      return;
    }
    setIsFavorite(!isFavorite);
    dispatch(addToFavorites(item.id));
  };
  // Update the navigation handler
  const handleNavigateToRestaurant = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item && item.id) {
      const restaurantId = parseInt(item.id);
      if (!isNaN(restaurantId)) {
        navigate(`/restaurant/${restaurantId}`);
      }
    }
  }; 
  return (
    <Card 
      className="w-[18rem] cursor-pointer" 
      onClick={handleNavigateToRestaurant}
    >
      <div className={`${item?.open ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
        <img
          className='w-full h-[10rem] rounded-t-md object-cover'
          src={displayImage} 
          alt={item.name || 'Restaurant'}
        />

        <Chip 
          size="small"
          className="absolute top-2 right-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "OPEN" : "CLOSED"}
        />
      </div> 
      
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p 
            onClick={handleNavigateToRestaurant} 
            className="font-semibold text-lg cursor-pointer"
          >
            {item?.name || 'Restaurant Name'}
          </p>
          <p className="text-gray-500 text-sm">
            {item.description || "Craving it all? Dive into our global flavors."}
          </p>
          <p className="text-gray-500 text-sm">
            {item.cuisineType || "Indian Fast Food"}
          </p>
        </div>
        <div>
          <IconButton onClick={handleFavoriteClick}>
            {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;