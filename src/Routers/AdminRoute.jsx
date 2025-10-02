import React from 'react'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import {Admin} from '../AdminComponent/Admin/Admin'

export const AdminRoute = () => {
  return (
    <div>
      {false ? <CreateRestaurantForm/> : <Admin/>}
    </div>
  )
}
export default AdminRoute;
