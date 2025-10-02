import { apiClient } from '../../Config/api';  
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  // Add these missing action types
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE
} from "./ActionTypes";

export const getAllRestaurantsAction = () => {
  return async (dispatch) => {
    dispatch({type:GET_ALL_RESTAURANTS_REQUEST});
    try {
      const { data } = await apiClient.get("/restaurants");
      
      dispatch({type:GET_ALL_RESTAURANTS_SUCCESS,payload:data});
      console.log("all restaurant ", data);
    } catch (error) {
      console.log("catch error ",error)
      dispatch({type:GET_ALL_RESTAURANTS_FAILURE,payload:error});
    }
  };
};


export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const response = await apiClient.get(`/restaurants/${reqData.restaurantId}`);
      dispatch({ 
        type: GET_RESTAURANT_BY_ID_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      console.log("error", error);
      dispatch({ 
        type: GET_RESTAURANT_BY_ID_FAILURE, 
        payload: error.message 
      });
    }
  };
};




export const getRestaurantByUserId =(jwt) =>{
    return async(dispatch) =>{
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
        try{
            const {data} =await apiClient.get(`/restaurants/user`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });
            console.log("restaurant by user id",data);
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data});
        }catch(error){
            console.log("error",error);
            dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error});
        }
    }
};

export const createRestaurant =(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        try {
            const response = await apiClient.post("/admin/restaurant", reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type:CREATE_RESTAURANT_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:CREATE_RESTAURANT_FAILURE,payload:error});
        }
    }
};

export const updateRestaurant =({restaurantId,jwt,restaurantData})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try {
            const response = await apiClient.put(`/admin/restaurant/${restaurantId}`, 
                restaurantData,
                {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:UPDATE_RESTAURANT_FAILURE,payload:error});
        }
    }
};

export const deleteRestaurant =({restaurantId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:DELETE_RESTAURANT_REQUEST});
        try {
            const response = await apiClient.delete(`/admin/restaurant/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("delete response",response);
            dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:response.data});
        }   catch (error) {
            console.log("error",error);
            dispatch({type:DELETE_RESTAURANT_FAILURE,payload:error});
        }
    }
};

export const updateRestaurantStatus =({restaurantId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_STATUS_REQUEST});      
        try {
            const response = await apiClient.put(`/admin/restaurant/${restaurantId}/status`,
                {}, 
                {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("status update response",response);
            dispatch({type:UPDATE_RESTAURANT_STATUS_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:UPDATE_RESTAURANT_STATUS_FAILURE,payload:error});
        }
    }
};

export const createEventAction = ({data,jwt,restaurantId}) => {
    return async (dispatch) => {
        dispatch({type:CREATE_EVENTS_REQUEST});
        try {
            const response = await apiClient.post(`/admin/restaurant/${restaurantId}/event`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create event response",response);
            dispatch({type:CREATE_EVENTS_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:CREATE_EVENTS_FAILURE,payload:error});
        }
    }
};

export const getAllEventsAction = ({jwt}) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_EVENTS_REQUEST});
        try {
            const response = await apiClient.get(`/events`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get all events response",response);
            dispatch({type:GET_ALL_EVENTS_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:GET_ALL_EVENTS_FAILURE,payload:error});
        }
    }
};

export const deleteEventAction = ({eventId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_EVENTS_REQUEST});
        try {
            const response = await apiClient.delete(`/admin/event/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("delete event response",response);
            dispatch({type:DELETE_EVENTS_SUCCESS,payload:response.data});
        }
            catch (error) {
            console.log("error",error);
            dispatch({type:DELETE_EVENTS_FAILURE,payload:error});
        }   
    }
}

export const getEventsByRestaurantId = ({restaurantId,jwt}) => {
    return async (dispatch) => {
        dispatch({type:GET_RESTAURANTS_EVENTS_REQUEST});
        try {
            const response = await apiClient.get(`/admin/restaurant/${restaurantId}/events`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("get events by restaurant id response",response);
            dispatch({type:GET_RESTAURANTS_EVENTS_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:GET_RESTAURANTS_EVENTS_FAILURE,payload:error});
        }
    }
};

// Category Actions
export const createCategoryAction = ({data,jwt}) => {
    return async (dispatch) => {
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try {
            const response = await apiClient.post(`/categories/admin`, data, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("create category response",response);
            dispatch({type:CREATE_CATEGORY_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:CREATE_CATEGORY_FAILURE,payload:error});
        }
    }
};

export const getRestaurantsCategory = ({restaurantId}) => {
    return async(dispatch) => {
        dispatch({type:GET_RESTAURANTS_CATEGORY_REQUEST});
        try {
            const response = await apiClient.get(`/categories/restaurant/${restaurantId}`);
            
            console.log("get restaurants category response",response);
            dispatch({type:GET_RESTAURANTS_CATEGORY_SUCCESS,payload:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:GET_RESTAURANTS_CATEGORY_FAILURE,payload:error});
        }
    }
};


export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
        
        // Get JWT from localStorage instead of destructuring undefined
        const token = localStorage.getItem("jwt");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        const { data } = await apiClient.get("/api/admin/categories", config);
        dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: data });
        
    } catch (error) {
        console.error("Category fetch error:", error);
        dispatch({ 
            type: GET_ALL_CATEGORIES_FAILURE, 
            payload: error.message 
        });
    }
};

export const addToFavorites = (restaurantId) => async (dispatch) => {
    try {
        const jwt = localStorage.getItem("jwt"); 
        const response = await apiClient.put(
            `/restaurants/${restaurantId}/add-favorites`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${jwt}` 
                }
            }
        );
        
        dispatch({
            type: 'ADD_TO_FAVORITES_SUCCESS', 
            payload: response.data
        });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        dispatch({
            type: 'ADD_TO_FAVORITES_FAILURE', 
            payload: error.message
        });
    }
};
