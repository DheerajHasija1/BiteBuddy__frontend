import { apiClient } from '../../Config/api';
import { GET_USER_ADDRESSES_SUCCESS ,
        GET_USER_ADDRESSES_REQUEST,
        GET_USER_ADDRESSES_FAILURE,
        CREATE_ADDRESS_REQUEST,
        CREATE_ADDRESS_SUCCESS,
        CREATE_ADDRESS_FAILURE,
        DELETE_ADDRESS_REQUEST,
        DELETE_ADDRESS_SUCCESS,
        DELETE_ADDRESS_FAILURE} from './ActionType';


export const createAddress =(addressData) =>{
    return async(dispatch) =>{
        dispatch({type :CREATE_ADDRESS_REQUEST});

        try{
            const jwt = localStorage.getItem('jwt');
            const {data} = await apiClient.post("/address/add",addressData,{
                headers :{
                    Authorization : `Bearer ${jwt}`,
                },
            });
            dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
            return data;
        }catch (error) {
        console.log("Create address error:", error);
        dispatch({ type: CREATE_ADDRESS_FAILURE, payload: error });
        throw error;
    }
  };
};

export const getUserAddress =() =>{
    return async(dispatch) =>{
        dispatch({type: GET_USER_ADDRESSES_REQUEST});

        try{
            const jwt = localStorage.getItem('jwt');
            const {data} = await apiClient.get("/address/user",{
                headers:{
                    Authorization :`Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_USER_ADDRESSES_SUCCESS, payload: data })
            return data;
        }catch (error) {
      console.log("Get addresses error:", error);
      dispatch({ type: GET_USER_ADDRESSES_FAILURE, payload: error });
      throw error;
    }
  };
};


export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    try {
      const jwt = localStorage.getItem('jwt');
      await apiClient.delete(`/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
    } catch (error) {
      console.log("Delete address error:", error);
      dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error });
      throw error;
    }
  };
};

