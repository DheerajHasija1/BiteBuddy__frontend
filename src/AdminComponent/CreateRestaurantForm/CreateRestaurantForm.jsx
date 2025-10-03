import { useFormik } from 'formik'
import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {CircularProgress} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Description, Email, Instagram} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton'
import {uploadImageToCloudinary} from '../util/uploadImageToCloudinary'


const initialValues={
    name:"",
    description:"",
    cuisineType:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    email:"",
    mobile:"",
    instagram:"",
    openingHours:"Mon-Sun :9:00 AM -12:00 PM",
    images:[]
}
const CreateRestaurantForm = () => {
    const [uploadImage,setUploadImage] =useState(false);
  const formik=useFormik({
    initialValues,
    onSubmit:(values)=>{
        const data={
            name:values.name,
            description:values.description,
            cuisineType:values.cuisineType,
            address:{
                street:values.streetAddress,
                city:values.city,
                state:values.state,
                pincode:values.pincode
            },
            contactInformation:{
                email:values.email,
                mobile:values.mobile,
                instagram:values.instagram
            },
            openingHours:values.openingHours,
            images:values.images  
        };
        console.log("resturant creation data",data)
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

    <div className='flex justify-center items-center min-h-screen py-10 px-5'>
      <div className="w-full max-w-4xl mx-auto">
        <h1 className='font-bold text-2xl text-center py-2'>
        Add New Restaurant
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
                <div className='flex flex-wrap gap-2 mb-2'  >
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
            <Grid item xs={12} sx={{ mb: 2 }}>
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
                    id="cuisineType"
                    name="cuisineType"
                    label="CuisineType"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.cuisineType}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="streetAddress"
                    name="streetAddress"
                    label="StreetAddress"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.streetAddress}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="city"
                    name="city"
                    label="City"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                ></TextField>
            </Grid>
            <Grid item xs={12}sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="state"
                    name="state"
                    label="State"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="pincode"
                    name="pincode"
                    label="Pincode"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.pincode}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="openingHours"
                    name="openingHours"
                    label="OpeningHours"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.openingHours}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField fullWidth
                    id="instagram"
                    name="instagram"
                    label="Instagram"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.instagram}
                ></TextField>
            </Grid>
            </Grid>  
            <Button variant='contained' color='primary' type="submit">
                Create Restaurant
            </Button>  
        </form>
      </div>
    </div>
  )
}


export default CreateRestaurantForm;