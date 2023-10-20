import React from 'react';
import AddExcersiceForm from '../components/shared/ExcersiceFormAdd';
import AddWorkoutForm from '../components/shared/WorkoutFormAdd';
import AddProgramForm from '../components/shared/ProgramFormAdd';
import { useState } from 'react';
import AuthGuardAdminContributor from '../AuthGuard/AuthGuardAdminContributor';
import keycloak from '../Keycloak';
import ContributorApplications from '../components/shared/ContributorApplications';
import DeleteUserView from '../components/shared/DeleteUsersView';
import { useNavigate } from "react-router-dom";

function RolePage() {
    const isAdmin = keycloak.hasRealmRole('admin');
    const [currentForm, setCurrentForm] = useState(1);
    const navigate = useNavigate();

    const renderForm = () => {
        switch (currentForm) {
            case 1:
                return <AddExcersiceForm />;
            case 2:
                return <AddWorkoutForm />;
            case 3:
                return <AddProgramForm />;
            case 4:
                return <ContributorApplications />;
            case 5:
                return <DeleteUserView />;
            default:
                return null;
        }
    }
    const onClickBack = () => { 
        navigate('/');
    }

    return (
        <div className="bg-white h-screen flex flex-col">
          <div className="bg-white py-4 flex flex-col items-center sm:flex-row sm:justify-center">
    <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 sm:mx-2"
        onClick={() => setCurrentForm(1)}>Add Exercise</button>
    <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 sm:mx-2"
        onClick={() => setCurrentForm(2)}>Add Workout</button>
    <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 sm:mx-2"
        onClick={() => setCurrentForm(3)}>Add Program</button>
    {isAdmin && (
        <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 sm:mx-2"
            onClick={() => setCurrentForm(4)}>Manage Applications</button>
    )}
    {isAdmin && (
        <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 sm:mx-2"
            onClick={() => setCurrentForm(5)}>Manage User</button>
    )}
    <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 sm:mx-2"
        onClick={onClickBack}>Back</button>
</div>

            <div className="bg-white flex-grow flex flex-col justify-center items-center">
            <h1
        className={`font-bold text-2xl italic text-right absolute top-6 right-5`}
      >
        MeFit
      </h1>
                {renderForm()}
            </div>
        </div>
    );
}

export default function () {
    return <AuthGuardAdminContributor component={RolePage} path="/some-path" />;
}
