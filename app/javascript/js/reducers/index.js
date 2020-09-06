import { DELETE_FROM_CART, ADD_ARTICLE, CREATE_ACCOUNT, CREATE_ACCOUNT_FAILED, LOGIN, LOGIN_FAILED, IS_LOGGED_IN, IS_NOT_LOGGED_IN, ADD_TO_CART, OPEN_CART, CLOSE_CART} from '../constants/action-types';

const initialState = {
    accessToken: null,
    serverError: null,
    articles: [],
    account: {
      username: null,
      isLoggedIn: false,
      loginErrors: [],
      newAccountCreated: false,
      newAccountCreatedErrors:[]
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

    if(action.type === ADD_ARTICLE)
    {
      newState.articles = state.articles.concat(action.payload)
    }

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
      newState.account.username = action.payload.username
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
      newState.account.username = action.payload.username;
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
    return newState;
  };
  
  export default rootReducer;