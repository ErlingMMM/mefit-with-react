import React from 'react';
import AddExcersiceForm from '../components/shared/ExcersiceFormAdd';
import AddWorkoutForm from '../components/shared/WorkoutFormAdd';
import AddProgramForm from '../components/shared/ProgramFormAdd';
import { useState } from 'react';
import AuthGuardAdminContributor from '../AuthGuard/AuthGuardAdminContributor';
import keycloak from '../Keycloak';
import ContributorApplications from '../components/shared/ContributorApplications';

function RolePage() {
    const isAdmin = keycloak.hasRealmRole('admin');
    const [currentForm, setCurrentForm] = useState(1);

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
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-200 h-screen flex flex-col">
            <div className="bg-blue-500 py-4">
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                    onClick={() => setCurrentForm(1)}>Add Excersice</button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                    onClick={() => setCurrentForm(2)}>Add Workout</button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                    onClick={() => setCurrentForm(3)}>Add Program</button>
                {!isAdmin ? null : (
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                        onClick={() => setCurrentForm(4)}>Manage applications</button>
                )}
            </div>
            <div className="bg-gray-300 flex-grow flex flex-col justify-center items-center">
                {renderForm()}
            </div>
        </div>
    );
}

export default function () {
    return <AuthGuardAdminContributor component={RolePage} path="/some-path" />;
}
