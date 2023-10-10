import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAsync } from "../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/Store";
import keycloak from "../Keycloak";
import { log } from "console";


function ProfilePage() {

   const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const user = useSelector((state: any) => state.data.userData);
  //const loading = useSelector((state: any) => state.loading);

  
  useEffect(() => {
    dispatch(getLoginAsync());
  }, [dispatch]); 

  console.log(user);

  return (

    <div>
    <h1>Start Page</h1>
  
        <section className="actions">
          {!keycloak.authenticated && (
            <button onClick={() => keycloak.login()}>Login</button>
          )}
          {keycloak.authenticated && (
            <button onClick={() => keycloak.logout()}>Logout</button>
          )}
        </section>
  
        {keycloak.tokenParsed && keycloak.tokenParsed.name && (
        <><h1>velkommen: {keycloak.tokenParsed.name}</h1>
        <h1>din mail er : {keycloak.tokenParsed.email}</h1>
        <h1>JWT token : {keycloak.token}</h1></>
      )}
    </div>


    );
}

export default ProfilePage;