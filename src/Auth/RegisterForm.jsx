import React, { useState, useEffect } from 'react'
import { Field } from 'formik'
import { TextField, Button, Typography, Alert } from '@mui/material'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../Component/State/Authentication/Action'
import * as Yup from 'yup'
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'

const initialValues = {
    name: "",  // Changed from fullName to name
    email: "",
    password: "",
    role: ""
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required")
})

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);
    const [errorMessage, setErrorMessage] = useState("");

    console.log("🔵 RegisterForm rendered, auth state:", {
        jwt: auth.jwt,
        user: auth.user,
        loading: auth.loading
    });

    // First useEffect - Already logged in check
    useEffect(() => {
        if (auth.jwt && auth.user) {
            
            if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
                navigate("/admin/restaurant");
            } else {
                navigate("/");
            }
        }
    }, [auth.jwt, auth.user, navigate]);

    // Second useEffect - After registration navigation
    useEffect(() => {
        
        if (auth.user && auth.jwt) {
            if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
                navigate("/admin/restaurant");
            } else {
                navigate("/");
            }
        } else {
            console.log("Waiting for user profile... JWT:", auth.jwt);
        }
    }, [auth.user]);

    const handleSubmit = async (values) => {
        try {
            setErrorMessage("");

            const result = await dispatch(registerUser({ userData: values })).unwrap();
        } catch (error) {
            console.error(" Registration failed!");
            console.error(" Error:", error);
            setErrorMessage(error.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="text-white p-4">
            <Typography variant="h4" className="text-center mb-8 text-white font-bold">
                Register
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
                validationSchema={validationSchema}
                initialValues={initialValues}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-6">
                        <Field
                            as={TextField}
                            name="name"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
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
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
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
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                                '& .MuiOutlinedInput-input': { color: 'white' }
                            }}
                        />

                        <FormControl fullWidth error={touched.role && Boolean(errors.role)}>
                            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Role</InputLabel>
                            <Field
                                as={Select}
                                name="role"
                                label="Role"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                    '& .MuiSvgIcon-root': { color: 'white' },
                                    color: 'white'
                                }}
                            >
                                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                                <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                            </Field>
                            {touched.role && errors.role && (
                                <Typography color="error" variant="caption">{errors.role}</Typography>
                            )}
                        </FormControl>

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
                            REGISTER
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="mt-6 text-center text-white">
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Already have an account?{' '}
                    <Button
                        sx={{ 
                            color: '#e91e63',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                        }}
                        onClick={() => navigate("/account/login")}
                    >
                        LOGIN
                    </Button>
                </Typography>
            </div>
        </div>
    )
}

export default RegisterForm;
