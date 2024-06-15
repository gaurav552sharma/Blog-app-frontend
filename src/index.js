import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import "./index.css";
import UserProvider from './context/userContext';

const el=document.getElementById('root');
const root=ReactDOM.createRoot(el);

 root.render(<UserProvider><App/></UserProvider> );