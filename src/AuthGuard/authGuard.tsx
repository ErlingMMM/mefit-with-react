import { Navigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { ReactElement, ComponentType, useEffect, useState } from "react";
import React from "react";
import { RootState } from "../Redux/Store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { getLoginAsync, setRegistrationBoolean } from "../Redux/GenericSlice";
const authGuard = (Component: ComponentType<any>): ((props: any) => ReactElement) => (props: any): ReactElement => {
    
const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
const registrationState = useSelector((state: any) => state.data.RegistrationValidation);

const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  dispatch(getLoginAsync())
    .then((response) => {
      if (response.type !== "getLoginAsync/rejected") {
        dispatch(setRegistrationBoolean(true));
        console.log("authGuard: user is logged in");
      }
      setIsLoading(false);
    });
}, [dispatch]);

if (isLoading) {
    return <div>Loading...</div>;
  } else if ( registrationState.isRegistered) {
    return <Component {...props} />;
  } else {
    return <Navigate to="/onboarding" />;
  }

}

export default authGuard;