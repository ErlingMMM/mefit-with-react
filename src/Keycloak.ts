import Keycloak, { KeycloakInitOptions } from "keycloak-js";


let keycloakConfig;
// Uses "/keycloak.json" if local hosting or "/keycloakAzure.json" if deployed on Azure
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    keycloakConfig = "/keycloak.json";
} else {
    keycloakConfig = "/keycloakVercel.json";
}
// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak(keycloakConfig);

/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = (): Promise<boolean> => {
  const config: KeycloakInitOptions = {
    checkLoginIframe: false,
    onLoad: 'login-required',
    silentCheckSsoRedirectUri:
      window.location.origin + '/assets/silent-check-sso.html',
  };
  return keycloak.init(config);
};

export default keycloak;