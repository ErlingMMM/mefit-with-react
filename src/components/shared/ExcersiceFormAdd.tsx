import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import {setTimeExcersice, setNameExcersice,setDescriptionExcersice, setImgUrlExcersice, setMusclegGroupExcersice, setRepsExcersice, setSetsExcersice, setVideoUrlExcersice, AddExcersiceAsync} from '../../Redux/GenericSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function AddExcersiceForm() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [exerciseMuscleGroup, setExerciseMuscleGroup] = useState('');
  const [exerciseImageUrl, setExerciseImageUrl] = useState('');
  const [exerciseVideoUrl, setExerciseVideoUrl] = useState('');
  const [exerciseTime, setExerciseTime] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');
  const [hovered, setHovered] = useState(false);


  const navigate = useNavigate();
    
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(event.target.value);
  }
  
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseDescription(event.target.value);
    console.log(exerciseDescription);
  }
  
  const handlemuscleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseMuscleGroup(event.target.value);
    console.log(exerciseMuscleGroup);
  }
  
  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseImageUrl(event.target.value);
    console.log(exerciseImageUrl);
  }
  
  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseVideoUrl(event.target.value);
    console.log(exerciseVideoUrl);
  }
  
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseTime(event.target.value);
    console.log(exerciseTime);
  }
  
  const handleSetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseSets(event.target.value);
    console.log(exerciseSets);
  }
  
  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseReps(event.target.value);
    console.log(exerciseReps);
  }
  


      const handleSave = () => {   
        dispatch( AddExcersiceAsync({
            EXname : exerciseName ,
            EXdescpription: exerciseDescription,
            EXmusclegroup : exerciseMuscleGroup, 
            EXimgUrl : exerciseImageUrl,
            EXvidurl: exerciseVideoUrl, 
            EXTime : exerciseTime, 
            EXSets : exerciseSets, 
            EXReps : exerciseReps,
          }))
          navigate('/')
      }

      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };

      return (
        <div className="font-body">
          <h1 className="text-2xl font-bold mb-8 text-center">Create Exercise</h1>
          <form className='bg-white p-8 rounded-lg space-y-4'>
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="name">Name:</label>
              <input onChange={handleNameChange} className='w-full p-2 border rounded-lg' type="text" id="name" name="name" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="description">Description:</label>
              <input onChange={handleDescriptionChange} className='w-full p-2 border rounded-lg' type="text" id="description" name="description" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="muscleGroup">Muscle Group:</label>
              <input onChange={handlemuscleGroupChange} className='w-full p-2 border rounded-lg' type="text" id="muscleGroup" name="muscleGroup" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="image">Image:</label>
              <input onChange={handleImageUrlChange} className='w-full p-2 border rounded-lg' type="text" id="image" name="image" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="video">Video:</label>
              <input onChange={handleVideoUrlChange} className='w-full p-2 border rounded-lg' type="text" id="video" name="video" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="sets">Sets:</label>
              <input onChange={handleSetsChange} className='w-full p-2 border rounded-lg' type="text" id="sets" name="sets" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="reps">Reps:</label>
              <input onChange={handleRepsChange} className='w-full p-2 border rounded-lg' type="text" id="reps" name="reps" />
            </div>
    
            <div className="space-y-2">
              <label className='text-lg text-gray-800' htmlFor="time">Time:</label>
              <input onChange={handleTimeChange} className='w-full p-2 border rounded-lg' type="text" id="time" name="time" />
            </div>
    
            <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSave}
      className="w-full overflow-hidden font-bold sm:py-2 py-6 mt-2 rounded-lg relative block leading-tight ease-in"
    >
      <div className="absolute -inset-6 rounded-lg transition-color group italic bg-custom-green text-lg"></div>
      <span className={`absolute -inset-6 rounded-lg text-${hovered ? 'white' : 'black'} `}></span>

      <span
        className={`absolute -left-48 sm:-left-12 w-[47rem] sm:h-[8rem] h-36 text-${hovered ? 'white' : 'black'} bg-black transition-all duration-700 origin-top-right rounded-r-full -translate-x-full translate-y-24 ease ${hovered ? '-rotate-180' : ' -rotate-90'}`}
      ></span>

      <span className={`relative text-lg bottom-2 ease-in italic text-${hovered ? 'white' : 'black'} top-0.5`}>Save Exercise</span>
    </button>
          </form>
        </div>
    );
    
}

export default AddExcersiceForm;