import React, { useState } from 'react';
import { RootState } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

function AddWorkoutForm() {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const [selectedName, setSelectedName] = useState("");
    const navigate = useNavigate();
    const [selectedDescription, setSelectedAge] = useState("");
    const [selectedRecommendedFitness, setSelectedRecommendedFitness] = useState("");
    const [selectedWeight, setSelectedWeight] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    return (
        
      <form className='bg-white p-8 rounded shadow-md'>
      <label className='block mb-2 text-gray-800' htmlFor="bio">name:</label>
      <input   className='w-full p-2 mb-4 border rounded' type="text" id="name" name="name" />

      <label className='block mb-2 text-gray-800' htmlFor="age">description:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="description" name="description" />

      <label className='block mb-2 text-gray-800' htmlFor="height">"recommendedFitness:</label>
      <input  className='w-full p-2 mb-4 border rounded' type="text" id="recommendedFitness" name="recommendedfitness" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">image:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="image" name="image" />

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Save</button>

    </form>
    );
}


export default AddWorkoutForm;