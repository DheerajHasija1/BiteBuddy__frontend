import React ,{useEffect} from 'react'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import {Admin} from '../AdminComponent/Admin/Admin'
import { Route,Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRestaurantByUserId } from '../Component/State/Restaurant/Action'

export const AdminRoute = () => {
  const { restaurant, auth } = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch restaurant data when component loads
    if (auth.jwt && !restaurant.usersRestaurant) {
      dispatch(getRestaurantByUserId(auth.jwt));
    }
  }, [auth.jwt, dispatch]);

  return (
    <div>
      {/* {false ? <CreateRestaurantForm/> : <Admin/>} */}
      <Routes>
        <Route
         path="/*" 
         element={
          // !restaurant.usersRestaurant?<CreateRestaurantForm/> : <Admin/>
          !restaurant.usersRestaurant ? <CreateRestaurantForm/> : <Admin/>
          // <Admin/>
          }>
        </Route>
      </Routes>
    </div>
  )
}
export default AdminRoute;
