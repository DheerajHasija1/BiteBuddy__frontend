import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Authentication/Reducer';
import restaurantReducer from './Restaurant/Reducer'; 
import menuItemReducer from './Menu/Reducer';
import cartReducer from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import { restaurantOrderReducer } from './Restaurant Order/Reducer';
import { ingredientReducer } from './Ingredients/Reducer';
import { addressReducer } from './Address/Reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrders: restaurantOrderReducer,
    ingredients: ingredientReducer,
    address: addressReducer

});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk)
);
