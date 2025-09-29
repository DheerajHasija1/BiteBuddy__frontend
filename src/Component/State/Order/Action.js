import {apiClient} from '../../Config/api';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE
} from './ActionType';


export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({type:CREATE_ORDER_REQUEST});
    try {
      const {data} = await apiClient.post('orders/add', reqData.order,{
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
         if(data.paymentUrl){
           window.location.href=data.paymentUrl;
         }
      console.log("created order data",data)
      dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
    } catch (error) {
      console.log("error ",error)
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to create order';
      dispatch({type:CREATE_ORDER_FAILURE,errorMessage});
      // dispatch({type:CREATE_ORDER_FAILURE,payload:error});
    }
  };
};



export const getUsersOrders =(token) =>{
    return async (dispatch) =>{
        dispatch({type:"GET_USERS_ORDERS_REQUEST"});
        try {
            const response = await apiClient.get(`/orders/history`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Orders response:", response.data);
            dispatch({type:"GET_USERS_ORDERS_SUCCESS",payload:response.data});
        } catch (error) {
          console.log("Get orders error:", error);
          const errorMessage = error?.response?.data?.message || error?.message || 'Failed to fetch orders';
          dispatch({type:"GET_USERS_ORDERS_FAILURE",errorMessage});
          // dispatch({type:"GET_USERS_ORDERS_FAILURE",payload:error});
        }
    };
};  