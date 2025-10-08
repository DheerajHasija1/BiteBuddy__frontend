import React from 'react'
import { Card, CardMedia } from '@mui/material';
import { CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActions, IconButton } from '@mui/material';



const EventCard = () => {
    return (
        <div>
            <Card className="max-w-sm">
                <CardMedia
                    component="img"
                    height="140"
                    image="http://res.cloudinary.com/dcpesbd8q/image/upload/v1/ufillbuz6lzjilw0rrc3.jpg"
                    alt="Event"
                    sx={{ height: 140 }}
                />
                <CardContent>
                    <Typography variant="h5" component="h2">Indian Fast Food</Typography>
                    <Typography variant="body2" color="textSecondary">50% off on your first order</Typography>
                    <div className='py-2 space-y-2'>
                        <p className="text-gray-600">{"Rajpura"}</p>
                        <p className='text-sm text-blue-500'>October 10,2025 12:00 PM</p>
                        <p className='text-sm text-red-500'>October 20,2025 12:00 PM</p>
                    </div>
                </CardContent>
                {false && <CardActions>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}

export default EventCard