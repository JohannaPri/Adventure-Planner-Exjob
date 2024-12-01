import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { NuqsAdapter } from 'nuqs/adapters/react'
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NuqsAdapter>
          <App />
      </NuqsAdapter>
    </Provider>
  </React.StrictMode>,
);