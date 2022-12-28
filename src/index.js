// import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './app/store';
import './index.css';
import './tmdb.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
              <Route path='/*' element={<App />}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

