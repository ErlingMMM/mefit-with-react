import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAsync } from "../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/Store";



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
      <h1>Profile Page</h1>
      <p>Welcome to your profile page...</p>
      <p> yout goal is</p>
      <p>your n% to reach your goal</p>
      <p>your program</p>
      <p>your current level is</p>
      <p>your current intensity is</p>
      <p>your current timeframe is</p>   
    </div>
  );
}

export default ProfilePage;