import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const admin = require('firebase-admin')
const serviceAccount = {
    type: process.env.REACT_APP_TYPE,
    project_id: process.env.REACT_APP_PROJECT_ID,
    private_key_id: process.env.REACT_APP_PRIVATE_KEY_ID,
    private_key: process.env.REACT_APP_PRIVATE_KEY,
    client_email: process.env.REACT_APP_CLIENT_EMAIL,
    client_id: process.env.REACT_APP_CLIENT_ID,
    auth_uri: process.env.REACT_APP_AUTH_URI,
    token_uri: process.env.REACT_APP_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.REACT_APP_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.REACT_APP_CLIENT_X509_CERT_URL
  }

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: process.env.REACT_APP_DATABASE_URL
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
