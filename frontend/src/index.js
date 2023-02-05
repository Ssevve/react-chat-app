import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import { ConnectUsersContextProvider } from './context/ConnectedUsersContext';
import { store } from 'app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ConnectUsersContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConnectUsersContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
);
