import { Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const handleClose = () => {
  //   navigate("/");
  // }
  return (
    <>
      <Modal 
        open={
          location.pathname === "/account/register" 
          || location.pathname === "/account/login"
        }
        onClose={() => navigate("/")}
        aria-labelledby="auth-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(3px)'
          }
        }}
      >
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '8px',
          width: '95%',
          maxWidth: '400px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
            {location.pathname === "/account/register" ? <RegisterForm /> : <LoginForm />}
          {/* Add your form components here */}
        </div>
      </Modal>
    </>
  )
}
export default Auth;