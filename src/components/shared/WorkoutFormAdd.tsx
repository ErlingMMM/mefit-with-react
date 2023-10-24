import React, { SetStateAction, useState } from 'react';
import { RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { AddWorkoutAsync, setDescriptionWorkout, setNameWorkout, setRecommendedFitnessWorkout, setRecommendedImage } from '../../Redux/GenericSlice';
import { workerData } from 'worker_threads';
import AddExerciseComponent from '../RoleBasedComponents/AddExerciseComponent';
import setWorkoutId from '../../Redux/GenericSlice';


function AddWorkoutForm() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const navigate = useNavigate();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
    // Local states for form fields
    const [WorkoutName, setWorkoutName] = useState("");
    const [WorkoutDescription, setWorkoutDescription] = useState("");
    const [WorkoutFitnessLVL, setWorkoutFitnessLVL] = useState("");
    const [WorkoutImage, setWorkoutImage] = useState("");
    const [WorkoutDuration, setWorkoutDuration] = useState("");
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWorkoutName(event.target.value);
    };
    
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWorkoutDescription(event.target.value);
    };
    
    const handleRecommendedFitnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWorkoutFitnessLVL(event.target.value);
    };
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWorkoutImage(event.target.value);
    };
    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setWorkoutDuration(event.target.value);
    }

    const handleSave = (e: React.FormEvent) => {   
      e.preventDefault();
      dispatch(AddWorkoutAsync({WRname: WorkoutName, WRdescription: WorkoutDescription,  WRfintessLVL: WorkoutFitnessLVL, WRimgUrl: WorkoutImage, WRDuration: parseInt(WorkoutDuration) }))
      .then(response => {
        console.log("Promise resolved", response);
        if (response.payload) {
          setIsFormSubmitted(true);  // Ensure this line is being reached
          
        }
      })
      .catch(error => {
        console.log("Promise rejected", error);
      });
    };
      
    
    return (
      isFormSubmitted
      ? <AddExerciseComponent />
      : (
        <form className='bg-white p-8 rounded-lg space-y-4 font-body'>
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="bio">Name:</label>
            <input onChange={handleNameChange} className='w-full p-2 border rounded-lg' type="text" id="name" name="name" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="age">Description:</label>
            <input onChange={handleDescriptionChange} className='w-full p-2 border rounded-lg' type="text" id="description" name="description" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="height">Recommended Fitness:</label>
            <input onChange={handleRecommendedFitnessChange} className='w-full p-2 border rounded-lg' type="text" id="recommendedFitness" name="recommendedfitness" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="weight">Image:</label>
            <input onChange={handleImageChange} className='w-full p-2 border rounded-lg' type="text" id="image" name="image" />
          </div>

          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="weight">Duration:</label>
            <input onChange={handleDurationChange} className='w-full p-2 border rounded-lg' type="text" id="duration" name="duration" />
          </div>
          <div>
            <button onClick={handleSave} className="w-full bg-custom-green text-white font-bold py-2 px-4 rounded-lg focus:ring focus:ring-green-200" type="submit">Add Exercises</button>
          </div>
        </form>
      )
  );
  
}

export default AddWorkoutForm;