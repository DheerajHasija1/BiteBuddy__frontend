import React from "react";
import { Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../State/Authentication/Action";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const menu = [
    {title:"Orders", icon:<ShoppingBagIcon sx={{ fontSize: "1.7rem" }} />},
    {title:"Favorites", icon:<FavoriteIcon sx={{ fontSize: "1.7rem" }} />},
    {title:"Address", icon:<HomeIcon sx={{ fontSize: "1.7rem" }} />},
    {title:"Payment", icon:<AccountBalanceIcon sx={{ fontSize: "1.7rem" }} />},
    {title:"Events", icon:<EmojiEventsIcon sx={{ fontSize: "1.7rem" }} />},
    {title:"Logout", icon:<LogoutIcon sx={{ fontSize: "1.7rem" }} />},
    // {title:"Notifications", icon:<NotificationsActiveIcon sx={{ fontSize: "1.7rem" }} />}
];

const ProfileNavigation = ({open, handleClose}) => {
    const isSmallerScreen = useMediaQuery("(max-width:840px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigation = (item) => {
        if(item.title === "Logout"){
            if (handleClose) handleClose();
            dispatch(logoutUser());
            navigate("/");
            return;
        }
        if (handleClose) handleClose();
        navigate(`/my-profile/${item.title.toLowerCase()}`);
    }

    return (
        <div className="profile-navigation">
            <Drawer 
                variant={isSmallerScreen ? "temporary" : "permanent"} 
                open={isSmallerScreen ? open : true} 
                anchor='left'
                onClose={handleClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        top: '68px',
                        width: '265px',
                        background: '#000000',
                        height: 'calc(100vh - 67px)',
                        boxSizing: 'border-box',
                        border: 'none',
                        position: 'fixed',
                        zIndex: 1200,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }}
            >
                <div className="flex flex-col py-5">
                    {menu.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => handleNavigation(item)} 
                            className="px-4 flex items-center space-x-5 cursor-pointer hover:bg-[#18191a] py-4"
                        >
                            <span className="text-gray-200">{item.icon}</span>
                            <span className="text-gray-200 text-lg">{item.title}</span>
                        </div>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}

export default ProfileNavigation;