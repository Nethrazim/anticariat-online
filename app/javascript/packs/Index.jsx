import React from 'react';
import ReactDOM from 'react-dom';
import {render} from "react-dom";
import '../index.css'
import App from '../App';

import {Provider} from 'react-redux'
import store from "../js/store/index";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});