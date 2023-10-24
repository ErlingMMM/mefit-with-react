import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUserOnboardingStatsAsync, getLoginAsync } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../../../Redux/Store";
import keycloak from "../../../Keycloak";
import { useNavigate } from "react-router-dom";
import CurrentProgramDisplayer from "./CurrentProgramDisplayer";
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"

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

    const workouts = useAppSelector(state => state.dashboard.workouts);  // <-- useAppSelector instead of useSelector
    const completedWorkouts = workouts.filter(workout => workout.isCompleted);
    const percentage = Math.floor(completedWorkouts.length/workouts.length*100);  // You can replace this with a dynamic value later



 console.log(user.picture)



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
                        <img src={user.picture ? user.picture : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
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

                    <div className="w-full text-left px-1">
                        <h1 className="mb-1/2"><b className="text-sm">Current Program</b></h1>
                        <h1 className="mb-1"><b className="text-lg">Full Body</b> {"("}{percentage}%{")"} completed</h1>
                    </div>
                    <CurrentProgramDisplayer/>
                </div>
            )}
            
        </div>


    );
}

export default ProfilePage;