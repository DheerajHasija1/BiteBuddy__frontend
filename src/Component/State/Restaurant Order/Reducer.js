import { 
    GET_RESTAURANTS_ORDER_REQUEST, 
    GET_RESTAURANTS_ORDER_SUCCESS,
    UPDATE_ORDER_STATUS_SUCCESS 
} from './ActionType';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10  
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
                orders: payload.content || [],
                currentPage: payload.number || 0,
                totalPages: payload.totalPages || 0,
                totalElements: payload.totalElements || 0,
                pageSize: payload.size || 10
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