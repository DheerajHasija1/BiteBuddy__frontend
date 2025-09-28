import { 
    GET_RESTAURANTS_ORDER_REQUEST, 
    GET_RESTAURANTS_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_SUCCESS 
} from './ActionType';

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

export const restaurantOrderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_RESTAURANTS_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_RESTAURANTS_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: payload
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order => 
                    order.id === payload.id ? payload : order
                )
            };
        default:
            return state;
    }
};

export default restaurantOrderReducer;