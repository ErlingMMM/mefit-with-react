import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import {setTimeExcersice, setNameExcersice,setDescriptionExcersice, setImgUrlExcersice, setMusclegGroupExcersice, setRepsExcersice, setSetsExcersice, setVideoUrlExcersice, AddExcersiceAsync} from '../../Redux/GenericSlice';
import { useNavigate } from 'react-router-dom';

function AddExcersiceForm() {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const navigate = useNavigate();
    const ExcersiceName = useSelector((state: any) =>  state.data.exerciseData.name);
    const ExcersiceDescription = useSelector((state: any) => state.data.exerciseData.description);
    const ExcersicemuscleGroup = useSelector((state: any) => state.data.exerciseData.muscleGroup);
    const ExcersiceImageUrl= useSelector((state: any) => state.data.exerciseData.imageUrl);
    const ExcersiceVideoUrl= useSelector((state: any) => state.data.exerciseData.videoUrl);
    const ExcersiceTime= useSelector((state: any) => state.data.exerciseData.time);
    const ExcersiceSets= useSelector((state: any) => state.data.exerciseData.sets);
    const ExcersiceReps= useSelector((state: any) => state.data.exerciseData.reps);


    
    const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setNameExcersice(event.target.value));
        console.log(ExcersiceName)
    
      }
      const handleDescriptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setDescriptionExcersice(event.target.value));
        console.log(ExcersiceDescription)
    
      }
      const handlemuscleGroupChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setMusclegGroupExcersice(event.target.value));
        console.log(ExcersicemuscleGroup)
    
      }
      const handleImageUrlChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setImgUrlExcersice(event.target.value));
        console.log(ExcersiceImageUrl)
  
      }
      const handleVideoUrlChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setVideoUrlExcersice(event.target.value));
        console.log(ExcersiceVideoUrl)
  
      }
      const handleTimeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setTimeExcersice(event.target.value));
        console.log(ExcersiceTime)
  
      }
      const handleSetsChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setSetsExcersice(event.target.value));
        console.log(ExcersiceSets)
  
      }

      const handleRepsChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setRepsExcersice(event.target.value));
        console.log(ExcersiceReps)
  
      }


      const handleSave = () => {   
        dispatch( AddExcersiceAsync({
            EXname : ExcersiceName ,
            EXdescpription: ExcersiceDescription,
            EXmusclegroup : ExcersicemuscleGroup, 
            EXimgUrl : ExcersiceImageUrl,
            EXvidurl: ExcersiceVideoUrl, 
            EXTime : ExcersiceTime, 
            EXSets : ExcersiceSets, 
            EXReps : ExcersiceReps,
          }))
          navigate('/')
      }

    return (
      <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Add Exercise</h1>
      <form className='bg-white p-8 rounded '>
      <label className='block mb-2 text-gray-800' htmlFor="name">name:</label>
      <input onChange={handleNameChange}  className='w-full p-2 mb-4 border rounded' type="text" id="name" name="name" />

      <label className='block mb-2 text-gray-800' htmlFor="description">description:</label>
      <input onChange={handleDescriptionChange} className='w-full p-2 mb-4 border rounded' type="text" id="descpription" name="despcription" />

      <label className='block mb-2 text-gray-800' htmlFor="muscleGroup">muscleGroup:</label>
      <input onChange={handlemuscleGroupChange} className='w-full p-2 mb-4 border rounded' type="text" id="muscleGroup" name="muscleGroup" />

      <label className='block mb-2 text-gray-800' htmlFor="image">image:</label>
      <input onChange={handleImageUrlChange} className='w-full p-2 mb-4 border rounded' type="text" id="image" name="image" />

      <label className='block mb-2 text-gray-800' htmlFor="video">video:</label>
      <input onChange={handleVideoUrlChange} className='w-full p-2 mb-4 border rounded' type="text" id="video" name="video" />

      <label className='block mb-2 text-gray-800' htmlFor="sets">sets:</label>
      <input onChange={handleSetsChange} className='w-full p-2 mb-4 border rounded' type="text" id="video" name="video" />

      <label className='block mb-2 text-gray-800' htmlFor="reps">reps:</label>
      <input onChange={handleRepsChange} className='w-full p-2 mb-4 border rounded' type="text" id="reps" name="reps" />

      <label className='block mb-2 text-gray-800' htmlFor="time">time:</label>
      <input onChange={handleTimeChange} className='w-full p-2 mb-4 border rounded' type="text" id="time" name="time" />

      <button onClick={handleSave} className="w-full bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline" type="submit">Save</button>


    </form>
    </div>
    );
}

export default AddExcersiceForm;