import React from 'react';
import ReactDOM from 'react-dom/client';
// BORRADA la línea de import './index.html';
import App from './src/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);