import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleApiProvider } from 'react-gapi'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleApiProvider clientId="739140650399-hdlcrsphdb1eh83tgh95q5e9bop0nck6.apps.googleusercontent.com">
    <GoogleOAuthProvider clientId="739140650399-hdlcrsphdb1eh83tgh95q5e9bop0nck6.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </GoogleApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
