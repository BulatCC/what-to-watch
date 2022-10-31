import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import { AppContextProvider } from './Context/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>
);
