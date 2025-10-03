import { Button,Grid, Card, CardHeader, CardContent } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export const RestaurantDetails = () => {
  const handleRestaurantStatus=()=>{}
  return (
    <div className='lg:px-20 px-5'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>Indian Fast Food</h1>
        <div>
          <Button color={true?"primary":"error"} className='py-[1rem] px-[2rem]' variant='contained' onClick={handleRestaurantStatus} size='large'>
            {true?"close":"open"}
          </Button>
        </div>
      </div>
       <Grid  container spacing={3} >
            <Grid item xs={12}>
                <Card >  
                <CardHeader title={<span className="text-gray-300">Restaurant</span>} />
                <CardContent>
                    <div className="flex mb-1">  
                        <p className="w-48">Owner</p>
                        <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Restaurant Name</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Cuisine Type</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Opening Time</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Status</p>
                            {true?<span className="px-5 py-2 rounded-full bg-green-400 text-xs" >Open</span> :
                                <span className="px-5 py-2 rounded-full bg-red-400 text-xs" >Close</span>}
                    </div>
                </CardContent>
                </Card>
            </Grid>
                                
            <Grid item xs={12} lg={6}>
                <Card >  
                <CardHeader title={<span className="text-gray-300">Address</span>} />
                <CardContent>
                    <div className="flex mb-1">  
                        <p className="w-48">Country</p>
                        <span className="pr-5" >Dheeraj</span>
                    </div> 
                    <div className="flex mb-1">  
                            <p className="w-48">City</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Pincode</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Street Address</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                </CardContent>
                </Card>
            </Grid>

            <Grid  item xs={12} lg={6}>
                <Card >  
                <CardHeader title={<span className="text-gray-300">Contacts</span>} />
                <CardContent>
                    <div className="flex mb-1">  
                        <p className="w-48">Email</p>
                        <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Mobile</p>
                            <span className="pr-5" >Dheeraj</span>
                    </div>
                    <div className="flex mb-1">  
                            <p className="w-48">Social</p>
                            <div className='flex item-center pb-4 gap-2'>
                                <a href="/">
                                    <InstagramIcon/>
                                </a>
                                <a href="/">
                                    <FacebookIcon />
                                </a>
                            </div>
                    </div>
                </CardContent>
                </Card>
            </Grid>
        </Grid>


    </div>
  )
}

export default RestaurantDetails;