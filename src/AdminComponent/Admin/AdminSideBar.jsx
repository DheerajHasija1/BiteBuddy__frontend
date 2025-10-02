import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, Divider } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import { Dashboard, Logout, ShoppingBag, ShopTwo } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Component/State/Authentication/Action';
import { useDispatch } from 'react-redux';
import { use } from 'react';

const menu = [
  {title:"Dashboard", icon:<Dashboard/>, path:""},
  {title:"Orders", icon:<ShoppingBag/>, path:"orders"},
  {title:"Menu", icon:<ShopTwo/>, path:"menu"},
  {title:"Food Category", icon:<CategoryIcon/>, path:"category"},
  {title:"Ingredients", icon:<FastfoodIcon/>, path:"ingredients"},
  {title:"Events", icon:<EventIcon/>, path:"event"},
  {title:"Details", icon:<AdminPanelSettingsIcon/>, path:"details"},
  {title:"Logout", icon:<LogoutIcon/>, path:""},
];

export const AdminSideBar = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const handleNavigate =(item) =>{
    navigate(`/admin/restaurant/${item.path}`)
    if(item.title === "Logout"){
        navigate("/")
        dispatch(logoutUser())
        handleClose()
    }
  }

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor='left'
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          color: 'white',
          borderRight: '1px solid #333',
        },
      }}
    >
      <List sx={{ mt: 1, padding: 0 }}>
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <ListItem 
              onClick={() => handleNavigate(item)}
              disablePadding
              sx={{display: 'flex',alignItems: 'center',py: 1.5,px: 2,'&:hover': {backgroundColor: '#141414ff',cursor: 'pointer'}}}
            >
              <ListItemIcon sx={{ minWidth: 40,color: 'white',mr: 2}}>{item.icon}</ListItemIcon>

              <ListItemText primary={item.title} sx={{ color: 'white','& .MuiTypography-root': {fontSize: '15px',fontWeight: 400}}} />
            </ListItem>
            {i !== menu.length-1 && (
              <Divider sx={{ mx: 2,my: 0.5}}/>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSideBar;
