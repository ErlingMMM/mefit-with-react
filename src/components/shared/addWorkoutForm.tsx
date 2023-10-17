import React, { SetStateAction, useState } from 'react';
import { RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { AddWorkoutAsync, setDescriptionWorkout, setNameWorkout, setRecommendedFitnessWorkout, setRecommendedImage } from '../../Redux/GenericSlice';
import { workerData } from 'worker_threads';

function AddWorkoutForm() {
  const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const WorkoutName = useSelector((state: any) =>  state.data.workoutData.name);
    const WorkoutDescription = useSelector((state: any) =>  state.data.workoutData.description);
    const WorkoutFitnessLVL = useSelector((state: any) =>  state.data.workoutData.recommendedFitness);
    const WorkoutImage = useSelector((state: any) =>  state.data.workoutData.image);

    const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setNameWorkout(event.target.value));
      console.log(WorkoutName)
  
    }
    const handleDescriptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setDescriptionWorkout(event.target.value));
      console.log(WorkoutDescription)
  
    }
    const handleRecommendedFitnessChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setRecommendedFitnessWorkout(event.target.value));
      console.log(WorkoutFitnessLVL)
  
    }
    const handleImageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setRecommendedImage(event.target.value));
      console.log(WorkoutImage)
  
    }

    const handleSave = () => {   
      dispatch(AddWorkoutAsync({WRname: WorkoutName, WRdescription: WorkoutDescription,  WRfintessLVL: WorkoutFitnessLVL, WRimgUrl: WorkoutImage }))
      navigate('/')
    }
    return (
      <form className='bg-white p-8 rounded shadow-md'>
      <label className='block mb-2 text-gray-800' htmlFor="bio">name:</label>
      <input  onChange={handleNameChange}  className='w-full p-2 mb-4 border rounded' type="text" id="name" name="name" />

      <label className='block mb-2 text-gray-800' htmlFor="age">description:</label>
      <input onChange={handleDescriptionChange} className='w-full p-2 mb-4 border rounded' type="text" id="description" name="description" />

      <label className='block mb-2 text-gray-800' htmlFor="height">"recommendedFitness:</label>
      <input  onChange={handleRecommendedFitnessChange} className='w-full p-2 mb-4 border rounded' type="text" id="recommendedFitness" name="recommendedfitness" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">image:</label>
      <input onChange={handleImageChange} className='w-full p-2 mb-4 border rounded' type="text" id="image" name="image" />

      <button onClick={handleSave} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Save</button>

    </form>
    );
}


export default AddWorkoutForm;