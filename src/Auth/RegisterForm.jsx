import React, { useState,useEffect }from 'react';
import { Field } from 'formik';
import { TextField, Button, Typography , Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { registerUser } from '../Component/State/Authentication/Action';
import * as Yup from 'yup';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const initialValues = {
    name: "",    // Changed from fullName to name
    email: "",
    password: "",
    role: ""
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),  
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required")
});

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((store) => store);
    const [errorMessage, setErrorMessage] = useState("");
    const [justRegistered, setJustRegistered] = useState(false);

    // const handleSubmit = (values) => {
    //     dispatch(registerUser({ userData: values, navigate }));
    //     console.log("Register Credentials", values);
    // };

    const handleSubmit = async (values) => {
        try {
            setErrorMessage("");
            console.log("Register Credentials", values);
            
            const result = await dispatch(registerUser({ userData: values, navigate })).unwrap();
            console.log("Registration result:", result); 
            setJustRegistered(true);
            
        } catch (error) {
            console.error("Registration failed:", error);
            console.error("Full error object:", JSON.stringify(error)); 
            setErrorMessage("Registration failed. Please check your details and try again.");
            setJustRegistered(false);
        }
    };

    // Auto-navigate after successful registration
        useEffect(() => {
            if (justRegistered && auth.user && auth.jwt) {
                console.log("User registered with role:", auth.user.role);
                
                if (auth.user.role === "ROLE_RESTAURANT_OWNER") {
                    navigate("/admin/restaurant");
                } else {
                    navigate("/");
                }
                
                setJustRegistered(false);
            }
        }, [auth.user, auth.jwt, justRegistered, navigate]);

    //  const handleSubmit = async (values) => {
    //     try {
    //         setErrorMessage(""); // पहले error clear करें
    //         console.log("Register Credentials", values);
            
    //         await dispatch(registerUser({ userData: values, navigate })).unwrap();
            
    //     } catch (error) {
    //         console.error("Registration failed:", error);
    //         setErrorMessage("Registration failed");
            
    //         // Different backend errors के लिए different messages
    //         // if (error.includes("already exists") || error.includes("Email already exists")) {
    //         //     setErrorMessage("This email is already registered! Please use a different email or login instead.");
    //         // } else if (error.includes("Internal Server Error")) {
    //         //     setErrorMessage("Registration failed due to server error. Please try again later.");
    //         // } else if (error.includes("validation")) {
    //         //     setErrorMessage("Please check your input details and try again.");
    //         // } else {
    //         //     setErrorMessage("Registration failed. Please check your details and try again.");
    //         // }
    //     }
    // };

  return (
    <div>
        <Typography variant="h5" className="text-center mb-4">
        Register
        </Typography>

        
            {/* Error Message Display */}
            {/* {errorMessage && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 2,
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        color: '#f44336',
                        border: '1px solid #f44336'
                    }}
                    onClose={() => setErrorMessage("")}
                >
                    {errorMessage}
                </Alert>
            )} */}

            {errorMessage && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 2,
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        color: '#f44336',
                        border: '1px solid #f44336'
                    }}
                    onClose={() => setErrorMessage("")}
                >
                    {errorMessage}
                </Alert>
            )}

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field
                        as={TextField}
                        name="name"    // Changed from fullName to name
                        label="Full Name"
                        fullWidth
                        error={errors.name && touched.name}  // Changed from fullName to name
                        helperText={errors.name && touched.name ? errors.name : ""}  // Changed from fullName to name
                        variant="outlined"/>

                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"/>

                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        style={{ marginTop: '5px', marginBottom: '10px' }}/>

                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Field
                            as={Select}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            label="Role"
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant</MenuItem>
                            {/* <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem> */}
                        </Field>
                        </FormControl>

                        <Button  sx={{ mt: 2, Padding:'1rem' }} fullWidth variant="contained" color="primary" type="submit">Register</Button>
                </Form>
            )}
        </Formik>
        <Typography variant='body2' align='center' sx={{ mt: 3 }}>
            Already have an account? 
            <Button size="small" onClick={() => navigate("/account/login")}>
                Login
            </Button>
        </Typography>


    </div>
  )
} 
export default RegisterForm;