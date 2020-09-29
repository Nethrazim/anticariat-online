import {LOGOUT, UPDATE_USER_DELIVERY_INFO ,UPDATE_USER_INFO, DELETE_CART_ALL, DELETE_FROM_CART, IS_LOGGED_IN, IS_NOT_LOGGED_IN, CREATE_ACCOUNT, CREATE_ACCOUNT_FAILED, SERVER_ERROR, LOGIN, LOGIN_FAILED, ADD_TO_CART, OPEN_CART, CLOSE_CART} from "../constants/action-types";
import {host_url} from "../constants/api-urls";

export function createAccount(payload)
{
    if(payload.errors)
    {
        return {type: CREATE_ACCOUNT_FAILED, payload};    
    }

    return {type: CREATE_ACCOUNT, payload};
}

export function serverError(payload)
{
    return {type: SERVER_ERROR, payload};
}

export function checkIsLoggedIn(token)
{
    return function(dispatch)
    {
        return fetch("/user_is_authed", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.status === 200)
            {
                return response.json()
            }
            else 
            {
                dispatch({type: IS_NOT_LOGGED_IN, payload: {}});    
            }
        })
        .then(json => {
            if(json)
            {
                dispatch({type: IS_LOGGED_IN, payload: json});
            }
        })
    }
}

export function deleteFromShoppingCart(payload)
{
    return {type: DELETE_FROM_CART, payload};
}

export function updateUserInfo(payload)
{
    return {type: UPDATE_USER_INFO, payload};
}

export function updateUserDeliveryInfo(payload)
{
    return {type: UPDATE_USER_DELIVERY_INFO, payload}
}

export function deleteAllFromShoppingCart()
{

    var payload = {};
    return {type: DELETE_CART_ALL, payload};
}


export function addToShoppingCart(payload)
{
    return {type: ADD_TO_CART, payload};
}

export function openCart(payload)
{
    return {type: OPEN_CART, payload};
}

export function closeCart(payload)
{
    return {type: CLOSE_CART, payload};
}

export function login(payload)
{  
    return function(dispatch)
    {
        var message = {
            username: payload.username,
            password: payload.password
        };
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        var request_options = {
            method: 'POST',
            body: JSON.stringify(message),
            cache: 'no-cache',
            headers: {
                'Content-Type':'application/json',
                'X-CSRF-token': csrf
            }
        }

        return fetch("/login", request_options)
        .then(response => {
            return  response.json();
        })
        .then(json => {
            if (json.errors)
            {
                dispatch({type: LOGIN_FAILED, payload: json});
            }
            else 
            {
                dispatch({ type: LOGIN, payload: json});
            }
           
        })
        .catch((error) => {
            dispatch({ type: SERVER_ERROR, payload: error })
        })
    }
}

export function logout()
{
    var payload = {};
    return {type: LOGOUT, payload};
}