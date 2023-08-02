import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './client/App.js';
import configureStore from "./client/redux/configureStore.js";
import { Provider as ReduxProvider } from "react-redux";
import reportWebVitals from './reportWebVitals';
const store = configureStore();
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();