import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Alert } from '@mui/material'
import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Component/State/Authentication/Action'

const initialValues = {
    email: "",
    password: ""
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store);
    const [errorMessage, setErrorMessage] = useState("");

    console.log("🔵 LoginForm rendered, auth state:", {
        jwt: auth.jwt,
        user: auth.user,
        loading: auth.loading,
        error: auth.error
    });

    // First useEffect - Already logged in check
    useEffect(() => {
        if (auth.jwt && auth.user) {
            if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
                navigate("/admin/restaurant");
            } else {
                navigate("/");
            }
        } else {
            console.log(" Not logged in yet - JWT:", auth.jwt, "User:", auth.user);
        }
    }, [auth.jwt, auth.user, navigate]);

    // Second useEffect - After login navigation
    useEffect(() => {
      
        if (auth.user && auth.jwt) {
            
            if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
                navigate("/admin/restaurant");
            } else {
                navigate("/");
            }
        } else {
            console.log(" Waiting for user profile... JWT:", auth.jwt);
        }
    }, [auth.user]);

    const handleSubmit = async (values) => {
        try {
            setErrorMessage("");
            const result = await dispatch(loginUser(values)).unwrap();
            
        } catch (error) {
            console.error(" Login failed!");
            console.error(" Error:", error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="text-white p-4">
            <Typography variant="h4" className="text-center mb-8 text-white font-bold">
                Login
            </Typography>

            {errorMessage && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 3,
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        color: 'white',
                        '& .MuiAlert-icon': { color: '#f44336' }
                    }}
                    onClose={() => setErrorMessage("")}
                >
                    {errorMessage}
                </Alert>
            )}

            <Formik 
                onSubmit={handleSubmit} 
                initialValues={initialValues}
            >
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
                            '&:hover': { backgroundColor: '#d81b60' }
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
                            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                        }}
                        onClick={() => navigate("/account/register")}
                    >
                        REGISTER
                    </Button>
                </Typography>
            </div>
        </div>
    )
}

export default LoginForm;

