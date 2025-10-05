import { Button, Grid, Card, CardHeader, CardContent } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from "react-redux"
import { updateRestaurantStatus } from '../../Component/State/Restaurant/Action';

export const RestaurantDetails = () => {
    const { restaurant } = useSelector((store) => store);
    const dispatch =useDispatch()
    const handleRestaurantStatus = () => {
        dispatch(updateRestaurantStatus({
            restaurantId: restaurant.usersRestaurant.id,
            jwt: localStorage.getItem("jwt")
        }))
    }   
    
    return (
        <div className='lg:px-20 px-5'>
            <div className='py-5 flex justify-center items-center gap-5'>

                <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
                    {restaurant.usersRestaurant?.name}
                </h1>
                <div>

                    <Button 
                        color={restaurant.usersRestaurant?.open ? "primary" : "error"} 
                        className='py-[1rem] px-[2rem]' 
                        variant='contained' 
                        onClick={handleRestaurantStatus} 
                        size='large'
                        disabled={!restaurant.usersRestaurant?.id} 
                    >
                        {restaurant.usersRestaurant?.open ? "close" : "open"}
                    </Button>
                </div>
            </div>
            
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Restaurant</span>} />
                        <CardContent>
                            <div className="flex mb-1">
                                <p className="w-48">Owner</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.owner?.name}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Restaurant Name</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.name}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Cuisine Type</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.cuisineType}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Opening Time</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.openingHours}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Status</p>
                                {restaurant.usersRestaurant?.open ? 
                                    <span className="px-5 py-2 rounded-full bg-green-400 text-xs">Open</span> :
                                    <span className="px-5 py-2 rounded-full bg-red-400 text-xs">Close</span>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Address</span>} />
                        <CardContent>

                            <div className="flex mb-1">
                                <p className="w-48">Street Address</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.address?.street}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">City</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.address?.city}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">State</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.address?.state}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Pincode</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.address?.pincode}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Country</p>
                                <span className="pr-5">India</span>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span className="text-gray-300">Contacts</span>} />
                        <CardContent>

                            <div className="flex mb-1">
                                <p className="w-48">Email</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.contactInformation?.email}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Mobile</p>
                                <span className="pr-5">{restaurant.usersRestaurant?.contactInformation?.phoneNumber}</span>
                            </div>

                            <div className="flex mb-1">
                                <p className="w-48">Social</p>
                                <div className='flex item-center pb-4 gap-2'>
                                    <a 
                                        href={`https://instagram.com/${restaurant.usersRestaurant?.contactInformation?.instagram?.replace('@', '')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <InstagramIcon />
                                    </a>
                                    <a href="/" target="_blank" rel="noopener noreferrer">
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