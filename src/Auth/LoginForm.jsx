import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Component/State/Authentication/Action';

const initialValues = {
  email: "",
  password: ""
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (auth.jwt) {
      navigate("/");
    }
  }, [auth.jwt, navigate]);

  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Navigation logic based on user role after login
  useEffect(() => {
    if (justLoggedIn && auth.user && auth.jwt) {

      console.log("User logged in with role:", auth.user.role);
      
      if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
        navigate("/admin/restaurant");
      } else {
        navigate("/");
      }
      
      setJustLoggedIn(false); // Reset flag
    }
  }, [auth.user, auth.jwt, justLoggedIn, navigate]);


  const handleSubmit = async (values) => {
    try {
      setErrorMessage(""); 
      // debugger
      await dispatch(loginUser(values)).unwrap();
      setJustLoggedIn(true); // Trigger navigation after user profile loads

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
      setJustLoggedIn(false);
    }
  };

  return (
    <div className="text-white p-4">
      <Typography variant="h4" className="text-center mb-8 text-white font-bold">
        Login
      </Typography>

      {/* Error Message Display */}
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            color: 'white',
            '& .MuiAlert-icon': {
              color: '#f44336'
            }
          }}
          onClose={() => setErrorMessage("")}
        >
          {errorMessage}
        </Alert>
      )}

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="space-y-6">
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-input': { color: 'white' }
            }}
          />

          <Field
            as={TextField}
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-input': { color: 'white' }
            }}
          />

          <Button
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              backgroundColor: '#e91e63',
              '&:hover': {
                backgroundColor: '#d81b60'
              }
            }}
            fullWidth
            variant="contained"
            type="submit"
          >
            LOGIN
          </Button>
        </Form>
      </Formik>

      <div className="mt-6 text-center text-white">
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Don't have an account?{' '}
          <Button
            sx={{
              color: '#e91e63',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
            onClick={() => navigate("/account/register")}
          >
            REGISTER
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default LoginForm;