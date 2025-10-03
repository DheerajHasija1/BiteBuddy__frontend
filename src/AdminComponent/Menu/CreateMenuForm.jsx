import { useFormik } from 'formik'
import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {CircularProgress} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Category, Description, Email, Instagram, Restaurant} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton'
import {uploadImageToCloudinary} from '../util/uploadImageToCloudinary'
import Ingredients from '../Ingredients/Ingredients';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const initialValues={
    name:"",
    description:"",
    price:"",
    categoryId:"",
    restaurantId:"",
    vegetarian:"true",
    seasonal:"false",
    ingredientItems:[],
    images:[]
}
const CreateMenuForm = () => {
    const [uploadImage,setUploadImage] =useState(false);
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            values.restaurantId = 2;
            console.log("data", values);
            const data = values;
            console.log("resturant creation data", data);
        },
    });
  const handleImageChange =async(e)=>{
    const file = e.target.files[0]
    setUploadImage(true)
    const image = await uploadImageToCloudinary(file)
    console.log(image);
    formik.setFieldValue("images",[...formik.values.images,image])
    setUploadImage(false)
  }; 

  const handleRemoveImage=(index)=>{
    const updatedImages=[...formik.values.images]
    updatedImages.splice(index,1);
    formik.setFieldValue("images",updatedImages)
  }
  return (

    <div className='py-10 px-5  justify-center min-h-screen'>
      <div className="lg:max-w-4xl">
        <h1 className='font-bold text-2xl text-center py-2'>
        Add Menu
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
            <Grid  spacing={2}>
            <Grid className='flex flex-wrap gap-5 mb-2' item xs={12}>
                <input 
                accept='image/*'
                id='fileInput'
                style={{display:"none"}}
                onChange={handleImageChange}
                type="file"
                />

                <label className='relative'htmlFor="fileInput">
                    <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                        <AddPhotoAlternateIcon className="text-white"/>
                    </span>
                    {uploadImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                        <CircularProgress/>
                    </div>
                    )}
                </label>
                <div className='flex flex-wrap gap-2 mb-2'>
                    {formik.values.images.map((image,index)=>
                        <div className='relative'>
                        <img 
                            className='w-24 h-24 object-cover'
                            key={index}
                            src={image} 
                        />
                        <IconButton
                        size='small'
                        sx={{
                            position :'absolute',
                            top:0,
                            right:0,
                            outline:"none"
                        }}
                        onClick={()=>handleRemoveImage()}>
                            <CloseIcon sx={{fontSize:"1rem"}}/>
                        </IconButton>
                        </div>
                    )}
                </div>

            </Grid> 
            <Grid item xs={12} sx={{ mb: 2 }} >
                <TextField fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                ></TextField>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="categoryId"
                        value={formik.values.categoryId}
                        label="Age"
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                 <FormControl  fullWidth >
                    <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        name='ingredientItems'
                        value={formik.values.ingredientItems}
                        onChange={formik.handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="ingredientItems" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        >
                        {["Bread","Sauce"].map((name,index) => (
                            <MenuItem
                            key={name}
                            value={name}
                            >
                            {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="seasonal"
                        value={formik.values.seasonal}
                        label="is Seasonal"
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="vegetarian"
                        value={formik.values.vegetarian}
                        label="Vegetarian"
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            
            
            </Grid>  
            <Button variant='contained' color='primary' type="submit">
                Create Menu Item
            </Button>  
        </form>
      </div>
    </div>
  )
}


export default CreateMenuForm;