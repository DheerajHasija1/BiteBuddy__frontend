import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRestaurantById, getRestaurantsCategory } from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
import { CircularProgress, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
import MenuCard from "../Restaurant/MenuCard";
// import Navbar from "../Navbar/Navbar";

const RestaurantDetails = () => { 
  const { id } = useParams();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, categories, loading } = useSelector((store) => store.restaurant);
  const { menuItems, loading: menuLoading } = useSelector((store) => store.menu);

  // Local state for filters
  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

 useEffect(() => {
    const restaurantId = parseInt(id);
    if (!isNaN(restaurantId)) {
      dispatch(getRestaurantById({
        restaurantId: restaurantId
      }));
      
      dispatch(getRestaurantsCategory({
        restaurantId: restaurantId
      }));
      
      dispatch(getMenuItemsByRestaurantId({
        restaurantId: restaurantId,
        vegetarian: true,
        seasonal: false,
        categoryId: ""
      }));
    }
  }, [dispatch, id]);


  // Separate useEffect for filter changes
  useEffect(() => {
    const restaurantId = parseInt(id);
    if (!isNaN(restaurantId)) {
      dispatch(getMenuItemsByRestaurantId({
        restaurantId: restaurantId,
        vegetarian: foodType === "veg",
        nonVegetarian: foodType === "non-veg",
        seasonal: foodType === "seasonal",
        categoryId: selectedCategory,
        jwt: jwt
      }));
    }
  }, [foodType, selectedCategory, id, dispatch, jwt]);

  // Handlers
  const handleFoodTypeChange = (e) => setFoodType(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Typography>Restaurant not found</Typography>
      </div>
    );
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="px-5 lg:px-20">
        {/* Restaurant Images */}
        <div className="h-[40vh] overflow-hidden relative">
          {restaurant.images && restaurant.images.length > 0 && (
            <img src={restaurant.images[0]} alt={restaurant.name} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Restaurant Info */}
        <div className="mt-5">
          <h1 className="text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-400 mt-2">{restaurant.description}</p>
          {/* Address and Timing from backend */}
          <div className="flex items-center gap-2 mt-4 text-gray-400">
            <span role="img" aria-label="location">📍</span>
            <span>
              {restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} {restaurant.address?.pincode}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <span role="img" aria-label="clock">🕒</span>
            <span>
              {restaurant.openingHours || "Timing not available"}
            </span>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex gap-8 mt-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            {/* Food Type Filter */}
            <div className="mb-8">
              <Typography variant="h5" className="text-white font-bold mb-4">Food Type</Typography>
              <FormControl component="fieldset" className="w-full">
                <RadioGroup value={foodType} onChange={handleFoodTypeChange}>
                  <FormControlLabel 
                    value="all" 
                    control={<Radio sx={{ color: '#ef4444', '&.Mui-checked': { color: '#ef4444' } }} />} 
                    label={<span className="text-white">All</span>}
                    className="mb-2"
                  />
                  <FormControlLabel 
                    value="veg" 
                    control={<Radio sx={{ color: '#ef4444', '&.Mui-checked': { color: '#ef4444' } }} />} 
                    label={<span className="text-white">Vegetarian only</span>}
                    className="mb-2"
                  />
                  <FormControlLabel 
                    value="non-veg" 
                    control={<Radio sx={{ color: '#ef4444', '&.Mui-checked': { color: '#ef4444' } }} />} 
                    label={<span className="text-white">Non-Vegetarian</span>}
                    className="mb-2"
                  />
                  <FormControlLabel 
                    value="seasonal" 
                    control={<Radio sx={{ color: '#ef4444', '&.Mui-checked': { color: '#ef4444' } }} />} 
                    label={<span className="text-white">Seasonal</span>}
                    className="mb-2"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {/* Food Category Filter */}
            <div>
              <Typography variant="h5" className="text-white font-bold mb-4">Food Category</Typography>
              <FormControl component="fieldset" className="w-full">
                <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
                  <FormControlLabel
                    value=""
                    control={<Radio sx={{ color: '#ef4444', '&.Mui-checked': { color: '#ef4444' } }} />}
                    label={<span className="text-white">All Categories</span>}
                    className="mb-2"
                  />
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <FormControlLabel
                        key={cat.id}
                        value={cat.name}  
                        control={<Radio sx={{ color: '#ef4444', '&.Mui-checked': { color: '#ef4444' } }} />}
                        label={<span className="text-white">{cat.name}</span>}
                        className="mb-2"
                      />
                    ))
                  ) : (
                    <Typography className="text-gray-400">No categories available</Typography>
                  )}
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {/* Right Content - Menu Items */}
          <div className="flex-1">
            <Typography variant="h4" className="text-white font-bold mb-6">Menu</Typography>
            {menuLoading ? (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            ) : (
              <div className="space-y-3">
                {menuItems && menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))
                ) : (
                  <Typography className="text-gray-400">No menu items found.</Typography>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ); 
};

export default RestaurantDetails;



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getRestaurantById, getRestaurantsCategory } from "../State/Restaurant/Action";
// import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
// import { CircularProgress, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
// import MenuCard from "../Restaurant/MenuCard";
// import Navbar from "../Navbar/Navbar";

// const RestaurantDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { restaurant, categories, loading } = useSelector((store) => store.restaurant);
//   const { menuItems, loading: menuLoading } = useSelector((store) => store.menu);

//   const [foodType, setFoodType] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     console.log("=== RestaurantDetails useEffect triggered ===");
//     console.log("Restaurant ID:", id);
//     console.log("JWT:", jwt);
    
//     const restaurantId = parseInt(id);
    
//     if (isNaN(restaurantId)) {
//       console.error("Invalid restaurant ID");
//       return;
//     }

//     console.log("Dispatching getRestaurantById...");
//     dispatch(getRestaurantById({ restaurantId, jwt }));
    
//     console.log("Dispatching getRestaurantsCategory...");
//     dispatch(getRestaurantsCategory({ restaurantId, jwt }));
    
//     console.log("Dispatching getMenuItemsByRestaurantId...");
//     dispatch(getMenuItemsByRestaurantId({
//       restaurantId,
//       vegetarian: false,
//       nonVegetarian: false,
//       seasonal: false,
//       categoryId: "",
//       jwt
//     }));
//   }, [dispatch, id, jwt]);

//   useEffect(() => {
//     const restaurantId = parseInt(id);
//     if (!isNaN(restaurantId)) {
//       dispatch(getMenuItemsByRestaurantId({
//         restaurantId,
//         vegetarian: foodType === "veg",
//         nonVegetarian: foodType === "non-veg",
//         seasonal: foodType === "seasonal",
//         categoryId: selectedCategory,
//         jwt
//       }));
//     }
//   }, [foodType, selectedCategory]);

//   const handleFoodTypeChange = (e) => setFoodType(e.target.value);
//   const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (!restaurant) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Typography>Restaurant not found</Typography>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="px-5 lg:px-20">
//         <div className="h-[40vh] overflow-hidden relative">
//           {restaurant.images && restaurant.images.length > 0 && (
//             <img src={restaurant.images[0]} alt={restaurant.name} className="w-full h-full object-cover" />
//           )}
//         </div>

//         <div className="mt-5">
//           <h1 className="text-4xl font-bold">{restaurant.name}</h1>
//           <p className="text-gray-400 mt-2">{restaurant.description}</p>
//           <div className="flex items-center gap-2 mt-4 text-gray-400">
//             <span>📍</span>
//             <span>
//               {restaurant.address?.street}, {restaurant.address?.city}, {restaurant.address?.state} {restaurant.address?.pincode}
//             </span>
//           </div>
//           <div className="flex items-center gap-2 mt-2 text-gray-400">
//             <span>🕒</span>
//             <span>{restaurant.openingHours || "Timing not available"}</span>
//           </div>
//         </div>

//         <div className="flex gap-8 mt-8">
//           <div className="w-80 flex-shrink-0">
//             <div className="mb-8">
//               <Typography variant="h5" className="text-white font-bold mb-4">Food Type</Typography>
//               <FormControl component="fieldset" className="w-full">
//                 <RadioGroup value={foodType} onChange={handleFoodTypeChange}>
//                   <FormControlLabel value="all" control={<Radio />} label={<span className="text-white">All</span>} />
//                   <FormControlLabel value="veg" control={<Radio />} label={<span className="text-white">Vegetarian</span>} />
//                   <FormControlLabel value="non-veg" control={<Radio />} label={<span className="text-white">Non-Vegetarian</span>} />
//                   <FormControlLabel value="seasonal" control={<Radio />} label={<span className="text-white">Seasonal</span>} />
//                 </RadioGroup>
//               </FormControl>
//             </div>

//             <div>
//               <Typography variant="h5" className="text-white font-bold mb-4">Food Category</Typography>
//               <FormControl component="fieldset" className="w-full">
//                 <RadioGroup value={selectedCategory} onChange={handleCategoryChange}>
//                   <FormControlLabel value="" control={<Radio />} label={<span className="text-white">All Categories</span>} />
//                   {categories && categories.length > 0 ? (
//                     categories.map((cat) => (
//                       <FormControlLabel
//                         key={cat.id}
//                         value={cat.name}
//                         control={<Radio />}
//                         label={<span className="text-white">{cat.name}</span>}
//                       />
//                     ))
//                   ) : (
//                     <Typography className="text-gray-400">No categories</Typography>
//                   )}
//                 </RadioGroup>
//               </FormControl>
//             </div>
//           </div>

//           <div className="flex-1">
//             <Typography variant="h4" className="text-white font-bold mb-6">Menu</Typography>
//             {menuLoading ? (
//               <div className="flex justify-center"><CircularProgress /></div>
//             ) : (
//               <div className="space-y-3">
//                 {menuItems && menuItems.length > 0 ? (
//                   menuItems.map((item) => <MenuCard key={item.id} item={item} />)
//                 ) : (
//                   <Typography className="text-gray-400">No menu items found</Typography>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );  
// };

// export default RestaurantDetails;