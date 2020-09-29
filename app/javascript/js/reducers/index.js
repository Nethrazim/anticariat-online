import { LOGOUT, UPDATE_USER_DELIVERY_INFO, UPDATE_USER_INFO, DELETE_CART_ALL, DELETE_FROM_CART, CREATE_ACCOUNT, CREATE_ACCOUNT_FAILED, LOGIN, LOGIN_FAILED, IS_LOGGED_IN, IS_NOT_LOGGED_IN, ADD_TO_CART, OPEN_CART, CLOSE_CART} from '../constants/action-types';

const initialState = {
    accessToken: null,
    serverError: null,
    account: {
      user:
      {
        id: null,
        username: null,
        first_name: '', 
        last_name: '',
        phone: '',
        email: '',
      },
      delivery_address: {
        address: '',
        city: '',
        country_id: null,
        region_id: null
      },
      isLoggedIn: false,
      loginErrors: [],
      newAccountCreated: false,
      newAccountCreatedErrors:null
    },
    shoppingCart: {
      isOpen: false,
      items:[]
    },
    order: {
      contact_person:{
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      details:''
    }
};

  
  function rootReducer(state = initialState, action) {
    var newState = Object.assign({}, state);

    if(action.type === CREATE_ACCOUNT)
    {
      newState.accessToken = action.payload.token;
      newState.account.newAccountCreated = true;
    }
    
    if(action.type === CREATE_ACCOUNT_FAILED)
    {
      newState.account.newAccountCreatedErrors = action.payload.errors;
    }

    if(action.type === LOGIN)
    {
      newState.accessToken = action.payload.token;
      newState.account.isLoggedIn = true;
      newState.account.user.id = action.payload.user.id;
      newState.account.user.username = action.payload.user.username;
      newState.account.user.first_name = action.payload.user.first_name;
      newState.account.user.last_name = action.payload.user.last_name;
      newState.account.user.phone = action.payload.user.phone;
      newState.account.user.email = action.payload.user.email;
      
      if(action.payload.user.delivery_address)
      {
        newState.account.delivery_address = action.payload.user.delivery_address;
      }
    }

    if(action.type === LOGOUT)
    {
      newState.accessToken = null;
      newState.account.isLoggedIn = false;
      newState.account.user.id = null;
      newState.account.user.username = null;
      newState.account.user.first_name = '';
      newState.account.user.last_name = '';
      newState.account.user.phone = '';
      newState.account.user.email = '';

      newState.account.delivery_address.address = '';
      newState.account.delivery_address.city = '';
      newState.account.delivery_address.country_id = null;
      newState.account.delivery_address.region_id = null;
    }

    if(action.type === LOGIN_FAILED)
    {
      newState.account.isLoggedIn = false;
      newState.account.loginErrors = action.payload.errors;
    }

    if(action.type === IS_LOGGED_IN)
    {
      newState.accessToken = action.payload.token;
      newState.account.isLoggedIn = true;
      newState.account.user.username = action.payload.user.username;
      if(action.payload.user.delivery_address)
      {
        newState.account.delivery_address = action.payload.user.delivery_address;
      }
    }

    if(action.type === IS_NOT_LOGGED_IN)
    {
      newState.account.isLoggedIn = false;
    }

    if(action.type === ADD_TO_CART)
    {
      newState.shoppingCart.items = newState.shoppingCart.items.concat(action.payload);
    }

    if(action.type === OPEN_CART)
    {
      newState.shoppingCart.isOpen = true; 
    }

    if(action.type === CLOSE_CART)
    {
      newState.shoppingCart.isOpen = false;
    }

    if(action.type === DELETE_FROM_CART)
    {
      let cart_items = [...state.shoppingCart.items];
      let idx;
      for(var index=0; index < cart_items.length; index++)
      {
        if(cart_items[index].id === action.payload)
        {
          idx = index;
          break;
        }
      }
      cart_items.splice(idx, 1);
      newState.shoppingCart.items = cart_items;
    }

    if(action.type === DELETE_CART_ALL)
    {
      newState.shoppingCart.items = [];
    }

    if(action.type === UPDATE_USER_INFO)
    {
      newState.account.user.first_name = action.payload.first_name;
      newState.account.user.last_name = action.payload.last_name;
      newState.account.user.phone = action.payload.phone;
      newState.account.user.email = action.payload.email;
    }

    if(action.type === UPDATE_USER_DELIVERY_INFO)
    {
      newState.account.delivery_address = action.payload;
    }

    return newState;
  };
  
  export default rootReducer;