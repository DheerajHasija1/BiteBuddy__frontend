import axios from "axios";
import {apiClient} from "../../Config/api";
import {
    GET_RESTAURANTS_ORDER_FAILURE,
    GET_RESTAURANTS_ORDER_REQUEST,
    GET_RESTAURANTS_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";


export const updateOrderStatus =({orderId,orderStatus,jwt}) => {
    return async (dispatch) =>{
        try{
            dispatch({type : UPDATE_ORDER_STATUS_REQUEST});

            const response = await apiClient.put(
                `/orders/${orderId}/${orderStatus}`,{},{
                    headers : {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            
            const updatedOrder = response.data;
            console.log("updated order" ,updatedOrder);

            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload :updatedOrder
            });
        } catch(error){
            console.log("catch error" ,error);
            dispatch({type :UPDATE_ORDER_STATUS_FAILURE,error});
        }
    };
};

export const fetchRestaurantsOrder =({ restaurantId, orderStatus, jwt, page = 0, size = 10 }) =>{
    return async (dispatch) =>{
        try{
            dispatch({type : GET_RESTAURANTS_ORDER_REQUEST});

            const {data} = await apiClient.get(
                `/orders/restaurant/${restaurantId}` ,{
                    params: { 
                        orderStatus: orderStatus,
                        page: page,
                        size: size
                    },
                    headers :{
                        Authorization :`Bearer ${jwt}`,
                    },
                }
            );

            const orders = data;
            console.log("restaurants order " ,orders);
            dispatch({
                type:GET_RESTAURANTS_ORDER_SUCCESS,
                payload :orders,
            });
        } catch(error){
            dispatch({type : GET_RESTAURANTS_ORDER_FAILURE,error});
        }
    };
};

