import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { setProgramName, setProgramDesc, setProgramImg, setProgramDur, setProgramOrd, AddProgramAsync, setPlanId} from '../../Redux/GenericSlice';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import AddWorkoutsCompoent from '../RoleBasedComponents/AddWorkoutsComponent';
function AddProgramForm() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [programName, setProgramName] = useState("");
  const [programDesc, setProgramDesc] = useState("");
  const [programImg, setProgramImg] = useState("");
  const [programDur, setProgramDur] = useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramName(event.target.value);
  }

  const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramDesc(event.target.value);
  }

  const handleImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramImg(event.target.value);
  }

  const handleDur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramDur(event.target.value);
  }

/*
  name: name,
        description: description,
        image: image,
        difficulty:difficulty,
        duration:duration,
        orderOfWorkouts : orderOfWorkouts,*/

    const postProgram = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(AddProgramAsync({
        name: programName,
        description: programDesc,
        image: programImg,
        duration: parseInt(programDur),
        difficulty: 1,
      }))
      .then(response => {
        console.log("Promise resolved", response);
        if (response.payload) {
          dispatch(setPlanId(response.payload));  // Set the plan ID in the state
          setIsFormSubmitted(true);  // Ensure this line is being reached
          // To store a variable
          localStorage.setItem('duration', programDur);
        }
      })
      .catch(error => {
        console.log("Promise rejected", error);
      });
    };

   

    return (
      isFormSubmitted
      ? <AddWorkoutsCompoent />
      : (
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center">Create Program</h1>
        <form className='bg-white p-8 rounded-lg space-y-4'>
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="name">Name:</label>
            <input onChange={handleName} className='w-full p-2 border rounded-lg' type="text" id="name" name="name" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="description">Description:</label>
            <input onChange={handleDesc} className='w-full p-2 border rounded-lg' type="text" id="description" name="description" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="image">Image:</label>
            <input onChange={handleImg} className='w-full p-2 border rounded-lg' type="text" id="image" name="image" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="programDuration">Program Duration:</label>
            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="15" name="programDuration" checked={programDur === '15'} />
                <span className="ml-2">15 days</span>
              </label>
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="30" name="programDuration" checked={programDur === '30'} />
                <span className="ml-2">30 days</span>
              </label>
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="60" name="programDuration" checked={programDur === '60'} />
                <span className="ml-2">60 days</span>
              </label>
            </div>
          </div>
  
        
          <div>
            <button onClick={postProgram} className="w-full bg-custom-green text-white font-bold py-2 px-4 rounded-lg focus:ring focus:ring-green-200" type="submit">Add Program</button>
          </div>
        </form>
        </div>
      )
  );
  
}


export default AddProgramForm;