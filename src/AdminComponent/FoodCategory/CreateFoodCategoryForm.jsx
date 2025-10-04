import React,{useState} from 'react'
import {Grid,TextField,Button} from '@mui/material'

const CreateFoodCategoryForm = () => {
    const [formData,setFormData] =useState({categoryName:"",restaurantId:""})
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
            Create Food Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="Food Category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={FormData.categoryName}
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

export default CreateFoodCategoryForm
