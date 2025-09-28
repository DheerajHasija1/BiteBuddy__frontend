// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserAddress } from '../State/Address/Action';

// export const AddressCard = ({address, showButton, handleSelectAddress}) => {
//     return (
//         <Card className="flex gap-5 w-64 p-5">
//             <HomeIcon />
//             <div className='space-y-3 text-gray-500'>
//                 <h1 className='font-semibold text-lg text-white'>
//                     {address?.addressType || 'Home'}
//                 </h1>
//                 <p>
//                     {address?.streetAddress}, {address?.city}, {address?.state}, {address?.pincode}
//                 </p>
//                 {showButton && (
//                     <Button variant="outlined" fullWidth 
//                         onClick={() => handleSelectAddress(address)}>
//                         Select
//                     </Button>
//                 )}
//             </div>
//         </Card>
//     )
// }

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
                <p>
                    {address?.streetAddress}, {address?.city}, {address?.state}, {address?.pincode}
                </p>
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
