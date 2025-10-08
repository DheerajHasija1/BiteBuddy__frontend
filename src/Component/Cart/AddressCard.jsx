import React, { useEffect } from 'react';
import { Card, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const AddressCard = ({address, showButton, handleSelectAddress}) => {
    return (
        <Card className="flex gap-5 w-64 p-5">
            <HomeIcon />
            <div className='space-y-3 text-gray-500'>
                <h1 className='font-semibold text-lg text-white'>
                    {address?.addressType || 'Home'}
                </h1>
                <div className="space-y-2">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {address.street}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        {address.city}, {address.state}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        {address.pincode} - India 
                                    </p>
                                </div>
                {showButton && (
                    <Button variant="outlined" fullWidth 
                        onClick={() => handleSelectAddress(address)}>
                        Select
                    </Button>
                )}
            </div>
        </Card>
    )
}
