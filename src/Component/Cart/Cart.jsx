    import { Divider, Grid, Card, Button, Modal, Box, TextField } from "@mui/material";
    import React , { useEffect }from "react";
    import CartItem from "./CartItem";
    // import AddressCard from "./AddressCard";
    import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
    import {ErrorMessage, Formik, Field, Form} from "formik";
    import * as Yup from "yup"
    import { useSelector } from "react-redux";
    import { useDispatch } from "react-redux";
    import { createOrder } from "../State/Order/Action"
    import { findCart } from "../State/Cart/Action";  
    import { AddressCard } from "./AddressCard";
    import { getUserAddress } from '../State/Address/Action';
    import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
    import { Navigate, useNavigate } from "react-router-dom";


    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline :"none",
    boxShadow: 24,
    p: 4,
    };
    const initialValues={
        street:"",
        state :"",
        pincode :"",
        city :""
    }


    const validationSchema=Yup.object().shape({
    streetAddress:Yup.string().required("Street address is requried"),
    state:Yup.string().required("State address is requried"),
    pincode:Yup.string().required("pincode address is requried"),
    city:Yup.string().required("city address is requried")
    })



    const Cart =() =>{
        const handleOpenAddressModel =() => setOpen(true);
        const [open, setOpen] = React.useState(false);
        const handleClose = () => setOpen(false);
        const {cart,address} = useSelector((store) => store);
        const navigate = useNavigate();
        
        const dispatch = useDispatch();
        useEffect(() => {
            const jwt = localStorage.getItem("jwt");
            if (jwt) {
                dispatch(findCart(jwt));
                dispatch(getUserAddress());
            }
        }, [dispatch]);

        const handleSubmit =(values)=>{
            const data ={
                jwt:localStorage.getItem("jwt"),
                order:{
                    restaurantId: cart?.cartItems[0]?.food?.restaurant?.id || 
                            cart?.cart?.items[0]?.food?.restaurant?.id ,
                    deliveryAddress : {
                        streetAddress : values.streetAddress,
                        city : values.city,
                        state : values.state,
                        pincode : values.pincode,
                        country :"India"
                    },
                    }
            }
            dispatch(createOrder(data));
            console.log("form value", data);
        }
        const createOrderUsingSelectedAddress = (address) => {
            console.log("Selected address:", address);
            
            const data = {
                jwt: localStorage.getItem("jwt"),
                order: {
                    restaurantId: cart.cart.items[0]?.food?.restaurant?.id ,
                    deliveryAddress: {
                        // fullName: auth.user?.fullName || "Customer",
                        streetAddress: address.streetAddress,
                        city: address.city,
                        state: address.state,
                        pincode: address.pincode,
                        country: address.country || "India"
                    },
                }
            }
            dispatch(createOrder(data));
            console.log("Order created with address:", data);
        };

        // Add safety check
        if (!cart || !cart.cartItems) {
            return <div>Loading cart...</div>;
        }

        //  Empty cart check
        if (!cart.cartItems || cart.cartItems.length === 0) {
            return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
                <ShoppingCartIcon 
                sx={{ 
                    fontSize: 120, 
                    color: '#e91e63', 
                    opacity: 0.5,
                    mb: 3 
                }} 
                />
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                Your Cart is Empty
                </h2>
                <p className="text-gray-500 text-lg mb-6">
                Looks like you haven't added anything to your cart yet
                </p>
                <Button
                onClick={() => navigate("/")}
                variant="contained"
                sx={{
                    bgcolor: '#e91e63',
                    '&:hover': { bgcolor: '#c2185b' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none'
                }}
                >
                Explore Menu
                </Button>
            </div>
            );
        }
            

        return(
            <>
                <main className="lg:flex justify-between">
                    <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-1 ">
                        {cart.cartItems.map((item, index) => (
                            <CartItem item={item} key={item.id || index} />
                        ))}



                        <Divider />
                    <div className="billlDetails px-5 text-sm">
                        <p className="font-extralight py-5"> Bill Details</p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-400">
                                <p>Item Total</p>
                                <p>₹ {cart?.cart?.totalPrice ?? 0}</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>Deliver Fee</p>
                                <p>₹ 20</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>GST and Restaurant Charges</p>
                                <p>₹33</p>
                            </div>
                            <Divider />
                            <div className="flex justify-between text-gray-400">
                                <p>Total Pay</p>
                                <p>₹{(cart?.cart?.totalPrice ?? 0) + 20 + 33}</p>
                            </div>  
                        </div>
                    </div>
                    </section>
                    <Divider orientation="vertical" flexItem/>
                    <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:">
                        <div>
                            <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>
                            <div className="flex gap-5 flex-wrap justify-center">
                                {address?.addresses?.map((addr) => (
                                    <AddressCard 
                                        key={addr.id}
                                        address={addr}
                                        handleSelectAddress={createOrderUsingSelectedAddress} 
                                        showButton={true}
                                    />
                                ))}
                                <Card className="flex gap-5 w-64 p-5">
                                    <AddLocationAltIcon />
                                    <div className='space-y-3 text-gray-500'>
                                        <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                        
                                            <Button variant="outlined" fullWidth onClick={handleOpenAddressModel}>Add</Button>
                                    
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </section>
                </main>


                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                            <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name ="streetAddress"
                                        label ="Street Address"
                                        fullWidth
                                        variant ="outlined"
                                    />
                                    <ErrorMessage name="streetAddress" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name ="city"
                                        label ="City"
                                        fullWidth
                                        variant ="outlined"
                                    />
                                    <ErrorMessage name="city" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name ="state"
                                        label ="State"
                                        fullWidth
                                        variant ="outlined"
                                    />
                                    <ErrorMessage name="state" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name ="pincode"
                                        label ="Pincode"
                                        fullWidth
                                        variant ="outlined"
                                    />
                                    <ErrorMessage name="pincode" component="div" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Add Address
                                    </Button>
                                </Grid>
                            </Grid>
                            </Form>
                        </Formik>
                    </Box>
                </Modal>
            </>
        )
    }


    export default Cart;

    