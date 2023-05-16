import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.scss';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLBaseElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      ,
    </Provider>
  </BrowserRouter>,
);
