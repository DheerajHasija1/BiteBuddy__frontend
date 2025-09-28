import React, { useState } from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Address from './Address';
import Favorites from './Favorites';
import Events from './Events';
import { useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const isSmallerScreen = useMediaQuery("(max-width:840px)");

    return (
        <div className="relative flex min-h-screen">
            {isSmallerScreen && (
                <button 
                    onClick={() => setOpenSideBar(true)}
                    className="fixed top-[70px] left-2 z-50 p-2 rounded-full bg-pink-600 text-white"
                >
                    <MenuIcon />
                </button>
            )}
            
            <ProfileNavigation 
                open={openSideBar} 
                handleClose={() => setOpenSideBar(false)} 
            />
            
            <div className="flex-1 ml-0 md:ml-[240px]">
                <Routes>
                    <Route path="/" element={<UserProfile />} />
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/address' element={<Address/>}/>
                    <Route path='/favorites' element={<Favorites/>}/>
                    <Route path='/events' element={<Events/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Profile;