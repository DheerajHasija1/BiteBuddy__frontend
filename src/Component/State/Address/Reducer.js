import {
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE,
    GET_USER_ADDRESSES_REQUEST,
    GET_USER_ADDRESSES_SUCCESS,
    GET_USER_ADDRESSES_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE
} from './ActionType';

const initialState = {
    addresses: [],
    loading: false,
    error: null
};

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ADDRESS_REQUEST:
        case GET_USER_ADDRESSES_REQUEST:
        case DELETE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: [...state.addresses, action.payload],
                error: null
            };

        case GET_USER_ADDRESSES_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload,
                error: null
            };

        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: state.addresses.filter(address => address.id !== action.payload),
                error: null
            };

        case CREATE_ADDRESS_FAILURE:
        case GET_USER_ADDRESSES_FAILURE:
        case DELETE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
