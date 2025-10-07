import React,{useState} from 'react'
import {Grid,TextField,Button} from '@mui/material'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch,useSelector } from 'react-redux';
import {createIngredient} from "../../Component/State/Ingredients/Action"


const CreateIngredientForm = () => {
    const [formData,setFormData] =useState({name:"",IngredientCategoryId:""})
        const {restaurant,ingredients} = useSelector((store) => store);
        const dispatch = useDispatch();
        const jwt = localStorage.getItem("jwt");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data={
        // name :formData.categoryName,
        // categoryId: ingredients,
        ...formData,
        restaurantId:restaurant.usersRestaurant?.id
    };

    dispatch(createIngredient({data,jwt}));
    console.log("data",data);
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
            Create Ingredients
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <TextField fullWidth
                    id="name"
                    name="name"
                    label="Category Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                ></TextField>

                            <Grid item xs={12}>
                                <FormControl fullWidth sx={{mt:2}}>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="categoryId"
                                        name="categoryId"
                                        value={formData.categoryId}
                                        label="Category"
                                        onChange={handleInputChange}
                                    >
                                        {ingredients.category.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                <Button variant="contained" color='primary' type="submit" sx={{mt:2}}  fullWidth>
                    Create Ingredient
                </Button>
            </Grid>
        </form>
      </div>
    </div>
  )
}

export default CreateIngredientForm
