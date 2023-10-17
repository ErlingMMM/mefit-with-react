import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import {setTimeExcersice, setNameExcersice,setDescriptionExcersice, setImgUrlExcersice, setMusclegGroupExcersice, setRepsExcersice, setSetsExcersice, setVideoUrlExcersice} from '../../Redux/GenericSlice';

function AddExcersiceForm() {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const ExcersiceName = useSelector((state: any) =>  state.data.exerciseData.name);
    const ExcersiceDescription = useSelector((state: any) => state.data.exerciseData.descpription);
    const ExcersicemuscleGroup = useSelector((state: any) => state.data.exerciseData.muscleGroup);
    const ExcersiceImageUrl= useSelector((state: any) => state.data.exerciseData.imageUrl);
    const ExcersiceVideoUrl= useSelector((state: any) => state.data.exerciseData.videoUrl);
    const ExcersiceTime= useSelector((state: any) => state.data.exerciseData.time);
    const ExcersiceSets= useSelector((state: any) => state.data.exerciseData.sets);
    const ExcersiceReps= useSelector((state: any) => state.data.exerciseData.reps);


    
    const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setNameExcersice(event.target.value));
    
      }
      const handleDescriptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setDescriptionExcersice(event.target.value));
    
      }
      const handlemuscleGroupChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setMusclegGroupExcersice(event.target.value));
    
      }
      const handleImageUrlChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setImgUrlExcersice(event.target.value));
  
      }
      const handleVideoUrlChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setVideoUrlExcersice(event.target.value));
  
      }
      const handleTimeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setTimeExcersice(event.target.value));
  
      }
      const handleSetsChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setSetsExcersice(event.target.value));
  
      }

      const handleRepsChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setRepsExcersice(event.target.value));
  
      }

      const handleDifficultyChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setRepsExcersice(event.target.value));
  
      }

    return (
        
      <form className='bg-white p-8 rounded shadow-md'>
      <label className='block mb-2 text-gray-800' htmlFor="bio">name:</label>
      <input onChange={handleNameChange}  className='w-full p-2 mb-4 border rounded' type="text" id="name" name="name" />

      <label className='block mb-2 text-gray-800' htmlFor="age">description:</label>
      <input onChange={handleDescriptionChange} className='w-full p-2 mb-4 border rounded' type="text" id="descpription" name="despcription" />

      <label className='block mb-2 text-gray-800' htmlFor="height">"muscleGroup:</label>
      <input onChange={handlemuscleGroupChange} className='w-full p-2 mb-4 border rounded' type="text" id="muscleGroup" name="muscleGroup" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">image:</label>
      <input onChange={handleImageUrlChange} className='w-full p-2 mb-4 border rounded' type="text" id="image" name="image" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">video:</label>
      <input onChange={handleVideoUrlChange} className='w-full p-2 mb-4 border rounded' type="text" id="video" name="video" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">sets:</label>
      <input onChange={handleSetsChange} className='w-full p-2 mb-4 border rounded' type="text" id="video" name="video" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">reps:</label>
      <input onChange={handleRepsChange} className='w-full p-2 mb-4 border rounded' type="text" id="reps" name="reps" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">time:</label>
      <input onChange={handleSetsChange} className='w-full p-2 mb-4 border rounded' type="text" id="time" name="time" />

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Save</button>

    </form>
    );
}


export default AddExcersiceForm;