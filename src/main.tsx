import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const domain = 'dev-tnw4dz300b3snudd.us.auth0.com';
const clientId = 'qMdu3y6UcwKxKFfl7ITW1rCEnujrT34I';

if (!domain || !clientId) {
  throw new Error('Missing Auth0 configuration. Please check your .env file.');
}

const origin = window.location.origin
console.log('Current origin:', origin); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: origin,
        audience: `http://${domain}/api/v2/`,
        scope: 'openid profile email'
      }}
      onRedirectCallback={(appState) => {
        console.log('Auth0 redirect callback:', appState); 
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);