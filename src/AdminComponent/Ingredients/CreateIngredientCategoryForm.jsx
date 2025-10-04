import React,{useState} from 'react'
import {Grid,TextField,Button,primary} from '@mui/material'

const CreateIngredientCategoryForm = () => {
    const [formData,setFormData] =useState({name:""});
  const handleSubmit = () => {

    const data={
        
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
                    value={FormData.name}
                ></TextField>

                <Button variant="contaied" color='primary' type="submit">
                    Create Category
                </Button>
            </Grid>
        </form>
      </div>
    </div>
  )
}

export default CreateIngredientCategoryForm;
