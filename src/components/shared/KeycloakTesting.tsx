import React, { useState } from "react";
import keycloak from "../../Keycloak";

const KeycloakUserRoleUpdater = () => {
  const [userId, setUserId] = useState(""); // Brukerens ID du vil endre rollen til
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateRole = (userId:string) => {

    const contributorID = "a7209254-84a0-420d-bf67-bf5287738cd2"
    const roleName =  "contributor";
    const keycloakBaseUrl = "https://lemur-10.cloud-iam.com/auth/"
    const realm = "deploy-mefit"  
    const clientId = "mefit-frontend-local"


    const url = `${keycloakBaseUrl}/admin/realms/${realm}/clients/${clientId}/users/${userId}/role-mappings/realm`;

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ id: contributorID, name: roleName }]), 
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Brukerens rolle ble oppdatert til contributor.");
        } else {
          setErrorMessage("Feil ved oppdatering av brukerens rolle.");
        }
      })
      .catch((error) => {
        setErrorMessage("Feil ved oppdatering av brukerens rolle.");
        console.error(error);
      });
  };

  return (
    <h1>heh</h1>
  )
};

export default KeycloakUserRoleUpdater;
