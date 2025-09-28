import { apiClient } from "../../Config/api";
import {
    CREATE_MENU_FAILURE,
    CREATE_MENU_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE
} from "./ActionType";

export const createMenuItem = ({menu,jwt})  => {
    return async(dispatch) => {
        try {
            const response = await apiClient.post('/admin/food', menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("createMenuItem", response);
            dispatch({ type: CREATE_MENU_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: CREATE_MENU_FAILURE, payload: error.message });
        }
    };
};


export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      // Fix URL parameters - use 'foodCategory' instead of 'foodcategory'  
      const response = await apiClient.get(
        `/food/restaurant/${reqData.restaurantId}?
        vegetarian=${reqData.vegetarian}&nonvegetarian=${reqData.nonVegetarian}&seasonal=${reqData.seasonal}&foodCategory=${reqData.categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("getMenuItemsByRestaurantId", response);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const searchMenuItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await apiClient.get(`/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data -----------", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE });
    }
  };
};

export const updateMenuItemsAvailability = ({ foodId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await apiClient.put(
        `admin/food/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("update menuitems Availability ", data);
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error.response ? error.response.data : "Something went wrong",
        });
    }
  };
};

export const deleteFoodAction = ({ foodId, jwt }) =>
async (dispatch) => {
  dispatch({ type: DELETE_MENU_ITEM_REQUEST });
  try {
    const { data } = await apiClient.delete(`/admin/food/${foodId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete food ", data);
    dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
  } catch (error) {
    dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
  }
};