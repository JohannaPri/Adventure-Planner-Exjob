import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/store';
import { NuqsAdapter } from 'nuqs/adapters/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NuqsAdapter>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NuqsAdapter>
    </Provider>
  </React.StrictMode>,
);