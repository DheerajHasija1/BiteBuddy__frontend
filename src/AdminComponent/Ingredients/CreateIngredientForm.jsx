import React,{useState} from 'react'
import {Grid,TextField,Button} from '@mui/material'
import IngredientTable from './IngredientTable'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const CreateIngredientForm = () => {
    const [formData,setFormData] =useState({name:"",IngredientCategoryId:""})
  const handleSubmit = () => {

    const data={
        name :formData.categoryName,
        restaurantId:{
            id:1
        },
    };
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
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="Category Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={FormData.categoryName}
                ></TextField>

                            <Grid item xs={12} sx={{ mb: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="IngredientCategoryId"
                                        value={formData.IngredientCategoryId}
                                        label="Category"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                <Button variant="contaied" color='primary' type="submit">
                    Create Category
                </Button>
            </Grid>
        </form>
      </div>
    </div>
  )
}

export default CreateIngredientForm
