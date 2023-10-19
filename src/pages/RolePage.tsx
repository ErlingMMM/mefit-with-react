import React from "react";
import AddExcersiceForm from "../components/shared/ExcersiceFormAdd";
import AddWorkoutForm from "../components/shared/WorkoutFormAdd";
import AddProgramForm from "../components/shared/ProgramFormAdd";
import { useState } from "react";
import AuthGuardAdminContributor from "../AuthGuard/AuthGuardAdminContributor";
import keycloak from "../Keycloak";
import ContributorApplications from "../components/shared/ContributorApplications";

function RolePage () {
    const isAdmin = keycloak.hasRealmRole('admin');
    const [currentForm, setCurrentForm] = useState(1);

    const renderForm = () => {
        switch (currentForm) {
            case 1: 
                return <AddExcersiceForm/>;
            case 2:
                return <AddWorkoutForm/>;
            case 3:
                return <AddProgramForm/>;
            case 4:
                return <ContributorApplications/>
            default:
                return null;
        }
    }
    return (
       <div>
        <div>
            <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline  self-end" onClick={() => setCurrentForm(1)}>Add Excersice</button>
            <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline  self-end" onClick={() => setCurrentForm(2)}>Add Workout</button>
 
            <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline  self-end" onClick={() => setCurrentForm(3)}>Add Program</button>
            {!isAdmin ? null : (
                <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline  self-end" onClick={() => setCurrentForm(4)}> Manage applications</button>
            )}
        </div>
        <div  className='bg-gray-500 h-screen flex flex-col justify-center items-center'>
        {renderForm()}
        </div>
       </div>
       

    );
}

export default function() {
    return <AuthGuardAdminContributor component={RolePage} path="/some-path" />;
  }