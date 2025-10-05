import React,{useState} from 'react'
import {Grid,TextField,Button} from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { createCategoryAction } from '../../Component/State/Restaurant/Action'

const CreateFoodCategoryForm = ({ onClose }) => {
    const [formData,setFormData] =useState({categoryName:""})
    const dispatch =useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
        const data = {
            name: formData.categoryName,
        };
        
        dispatch(createCategoryAction({
            data: data,
            jwt: localStorage.getItem("jwt")
        }));
        
        console.log("data", data);
        // ✅ Reset form
        setFormData({categoryName: ""});
        
        // ✅ Close modal
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
            Create Food Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
            <Grid item xs={12} >
                <TextField fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="Food Category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.categoryName}
                ></TextField>

                <Button variant="contained" color='primary' type="submit" fullWidth sx={{ mt: 2 }} >
                    Create Category
                </Button>
            </Grid>
        </form>
      </div>
    </div>
  )
}

export default CreateFoodCategoryForm
