import React from "react";
import AddExcersiceForm from "../components/shared/AddExcersiceForm";
import AddWorkoutForm from "../components/shared/AddWorkoutForm";
import AddProgramForm from "../components/shared/AddProgramForm";
import { useState } from "react";

function RolePage () {
    const [currentForm, setCurrentForm] = useState(1);

    const renderForm = () => {
        switch (currentForm) {
            case 1: 
                return <AddExcersiceForm/>;
            case 2:
                return <AddWorkoutForm/>;
            case 3:
                return <AddProgramForm/>;
            default:
                return null;
        }
    }
    return (
       <div>
        <div>
            <button onClick={() => setCurrentForm(1)}>Add Excersice</button>
            <button onClick={() => setCurrentForm(2)}>Add Workout</button>
            <button onClick={() => setCurrentForm(3)}>Add Program</button>
        </div>
        <div className='bg-gray-500 h-screen flex flex-col justify-center items-center'>
        {renderForm()}
        </div>
       </div>
       

    );
}

export default RolePage;