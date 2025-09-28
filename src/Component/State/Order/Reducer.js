import { 
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_USERS_ORDERS_FAILURE, 
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS 
} from "./ActionType";

// const initialState = {
//     loading: false,
//     error: null,
//     orders: []
// };
const initialState = {
    loading: false,
    error: null,
    orders: [],
    createdOrder: null
};

export const orderReducer =(state =initialState,{type,payload}) =>{
    switch(type){
        case GET_USERS_ORDERS_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                createdOrder: payload,
                error: null
            }
        case GET_USERS_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                orders: payload || []
            }
        case CREATE_ORDER_FAILURE:
        case GET_USERS_ORDERS_FAILURE:
            return{
                ...state,
                loading:false,
                error:typeof payload === 'string' ? payload : payload?.message || 'An error occurred'
                // error:payload
            }
        default:
            return state;           
    }
}