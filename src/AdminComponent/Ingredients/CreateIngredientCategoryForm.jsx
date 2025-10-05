import React,{useState} from 'react'
import {Grid,TextField,Button,primary} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import {createIngredientCategory} from "../../Component/State/Ingredients/Action"

const CreateIngredientCategoryForm = ({ onClose }) => {
    const [formData,setFormData] =useState({name:"",restaurantId:""});
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant} = useSelector((store) => store);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        name:formData.name,
        restaurantId:restaurant.usersRestaurant?.id
    };
    console.log("data",data);
    dispatch(createIngredientCategory({data,jwt}))

    // ✅ Reset and close
        setFormData({ name: "",restaurantId:""});
        if (onClose) onClose();
  }
  const handleInputChange=(e)=>{
    const {name,value} =e.target
    setFormData({
        ...formData,[name]:value
    })
  } 
  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-10'>
            Create Ingredient Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="name"
                    name="name"
                    label="Category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                    style={{mt:2}}
                ></TextField>

                <Button variant="contained" color='primary' type="submit" fullWidth sx={{ mt: 2 }}>
                    Create Category
                </Button>
            </Grid>
        </form>
      </div>
    </div>
  )
}

export default CreateIngredientCategoryForm;
