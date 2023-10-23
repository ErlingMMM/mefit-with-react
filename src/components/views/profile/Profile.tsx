import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUserOnboardingStatsAsync, getLoginAsync } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/Store";
import keycloak from "../../../Keycloak";
import { useNavigate } from "react-router-dom";
import CurrentProgramDisplayer from "./CurrentProgramDisplayer";

function ProfilePage() {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const user = useSelector((state: any) => state.data.userData);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getLoginAsync());
    }, [dispatch]);

    const handleEditClick = () => {
        navigate('/editprofile')
    }

    const handleApplicationClick = () => {
        navigate('/app')
    }

    const isAdmin = keycloak.hasRealmRole('admin');
    const isContributor = keycloak.hasRealmRole('contributor');
    const isuser = keycloak.hasRealmRole('user');






 console.log(keycloak)



    return (
        <div className="flex flex-col justify-center items-center p-4">
            <button onClick={handleEditClick} className="bg-custom-green text-black font-bold py-2 px-4 rounded focus:shadow-outline  self-end">
                edit profile
            </button>
            <br />
            {!(isAdmin || isContributor) && (
                <button onClick={handleApplicationClick} className="bg-custom-green text-black font-bold py-2 px-4 rounded focus:shadow-outline  self-end">
                    Apply to become a contributor
                </button>
            )}
            {keycloak.tokenParsed && keycloak.tokenParsed.name && (
                <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto p-4 text-center">
                    <div className='text-custom-green'>
                        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
                            alt="Cheetah!" className="w-32 h-32 object-cover rounded-full mb-4" style={{ border: '5px solid' }} />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{keycloak.tokenParsed.name}</h1>
                    <div className="my-4">
                        <p className="text-lg mb-2 font-bold">Fitness level:</p>
                        <p className="text-lg mb-4">{user.fitnessPreference}</p>
                    </div>
                    <div className="my-4">
                        <p className="text-lg mb-2 font-bold">Bio:</p>
                        <p className="text-lg mb-4">{user.bio}</p>
                    </div>
                    <div className="flex">
                        <div className="my-4 mx-2">
                            <p className="text-lg mb-2 font-bold">Age:</p>
                            <p className="text-lg mb-4">{user.age}</p>
                        </div>
                        <div className="my-4 mx-2">
                            <p className="text-lg mb-2 font-bold">Height (cm):</p>
                            <p className="text-lg mb-4">{user.height}</p>
                        </div>
                        <div className="my-4 mx-2">
                            <p className="text-lg mb-2 font-bold">Weight (kg):</p>
                            <p className="text-lg mb-4">{user.weight}</p>
                        </div>
                        <div className="my-4 mx-2">
                            <p className="text-lg mb-2 font-bold">Gender:</p>
                            <p className="text-lg mb-4">{user.gender}</p>
                        </div>
                    </div>

                    <CurrentProgramDisplayer/>
                </div>
            )}
        </div>


    );
}

export default ProfilePage;