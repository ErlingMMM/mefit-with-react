import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAsync } from "../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/Store";
import keycloak from "../Keycloak";



function ProfilePage() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
const user = useSelector((state:any) => state.data.data);
const loading = useSelector((state:any) => state.data.loading);
const error = useSelector((state:any) => state.data.error);



useEffect(() => {
  dispatch(getLoginAsync());
}, []); 

console.log(user)


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
  
        {keycloak.token && (
          <div>
            <h4>Token</h4>
            <pre>{keycloak.token}</pre>
          </div>
        )}
      <h1>Profile Page</h1>
      <p>Welcome to your profile page {user.name}</p>
      <p> Your bio: {user.bio}</p>
      <p>Your fitnesslevl: {user.fitnessPreference}</p>
      <p>your gender: {user.male}</p>
      <p>your height:{user.height}</p>
      <p>your weight: {user.weight}</p>   
    </div>


    );
}

export default ProfilePage;