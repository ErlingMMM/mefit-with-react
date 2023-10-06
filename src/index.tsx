import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initialize } from './Keycloak';
import reportWebVitals from './reportWebVitals';



const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  initialize()
  .then(() => { // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <App />
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
