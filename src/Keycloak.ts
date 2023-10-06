import Keycloak, { KeycloakInitOptions } from "keycloak-js";

// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json");

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