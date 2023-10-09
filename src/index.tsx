import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initialize } from './Keycloak';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';  // Importer Provider fra react-redux
import { store } from './Redux/Store';   // Importer Redux store

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  initialize()
  .then(() => { // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <Provider store={store}> {/* Wrap App komponenten med Provider og gi den Redux store som en prop */}
          <App />
        </Provider>
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });

  // Gjør noe med "root"
} else {
  console.error("Elementet med ID 'root' ble ikke funnet.");
}


// Display a loading screen when connecting to Keycloak

// Initialize Keycloak
