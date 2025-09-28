import axios from 'axios';
import { API_BASE_URL } from '../../Config/api';
import { ADD_TO_FAVORITES_SUCCESS, GET_USER_REQUEST, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS } from './ActionType';
import { ADD_TO_FAVORITES_FAILURE, GET_USER_FAILURE, LOGIN_FAILURE, LOGIN_REQUEST, LOGOUT, LOGOUT_FAILURE, LOGOUT_REQUEST } from './ActionType';
import { REGISTER_FAILURE } from './ActionType';
import { apiClient } from '../../Config/api';
import { GET_USER_SUCCESS } from './ActionType';
import { createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = (reqData) => async(dispatch) => {
    dispatch({type: REGISTER_REQUEST});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, reqData.userData);
        
        console.log("Register API Request:", reqData.userData); // Add this line for debugging
        
        if(data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        
        dispatch({type: REGISTER_SUCCESS, payload: data.jwt});
        console.log("Register Success", data);
    } catch(error) {
        dispatch({type: REGISTER_FAILURE, payload: error.message});
        console.log("Error while calling register API", error.response?.data || error.message);
    }
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (reqData, thunkAPI) => {
    try {
      const { data } = await apiClient.post("/auth/signin", reqData);

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);

        // fetch user profile
        const config = {
          headers: { Authorization: Bearer ${data.jwt} }
        };
        const userResponse = await apiClient.get("/users/profile", config);

        thunkAPI.dispatch({ type: GET_USER_SUCCESS, payload: userResponse.data });

        return data; // ✅ this becomes fulfilled payload
      }
    }catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUser = (jwt) => async (dispatch) => {
    dispatch({type: GET_USER_REQUEST});
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        };
        const {data} = await apiClient.get('/users/profile', config);
        dispatch({type: GET_USER_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_USER_FAILURE, payload: error.message});
    }
}

export const addToFavorite =({jwt,restaurantId})=> async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
        try{
            const {data} =await apiClient.put(`/restaurants/${restaurantId}/add-favorites`,{}, 
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }   
                }
            )

            dispatch({type:ADD_TO_FAVORITES_SUCCESS,payload:data.jwt});
            console.log("Add to Favorites Success",data);
        }catch(error){
            dispatch({type:ADD_TO_FAVORITES_FAILURE,payload:error});
            console.log("Error while calling Add to Favorites API",error);
        }
}

export const logoutUser = () => async (dispatch) => {
    try {
        localStorage.removeItem("jwt"); // Remove JWT token
        dispatch({ type: 'LOGOUT' }); // Dispatch logout action
    } catch (error) {
        console.error("Logout error:", error);
    }
};



