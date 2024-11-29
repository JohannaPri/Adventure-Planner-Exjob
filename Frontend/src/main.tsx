import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { NuqsAdapter } from 'nuqs/adapters/react'
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { persistor } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NuqsAdapter>
        <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
          <App />
        </BrowserRouter>
      </NuqsAdapter>
    </Provider>
  </React.StrictMode>,
);