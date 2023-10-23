import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { setProgramName, setProgramDesc, setProgramImg, setProgramDur, setProgramOrd, AddProgramAsync, setPlanId} from '../../Redux/GenericSlice';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import AddWorkoutsCompoent from '../RoleBasedComponents/AddWorkoutsComponent';
function AddProgramForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const ProgramName = useSelector((state: any) => state.data.programData.name);
  const ProgramDesc = useSelector((state: any) => state.data.programData.description);
  const ProgramImg = useSelector((state: any) => state.data.programData.image);
  const ProgramDur = useSelector((state: any) => state.data.programData.programDuration);
  const ProgramOrd = useSelector((state: any) => state.data.programData.orderOfWorkouts);
  const navigate = useNavigate();


    const handleName = (event: { target: { value: SetStateAction<string>; }; }) => {
    
      dispatch(setProgramName(event.target.value));
      console.log(ProgramName)
    }
    const handleDesc = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setProgramDesc(event.target.value));
  
    }
    const handleImg = (event: { target: { value: SetStateAction<string>; }; }) => {
     
      dispatch(setProgramImg(event.target.value));
  
    }
    const handleDur = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setProgramDur(event.target.value));
      console.log(ProgramDur);
    }
    const handleOrd = (event: { target: { value: SetStateAction<string>; }; }) => {

      dispatch(setProgramOrd(event.target.value));
      console.log(ProgramOrd)
    }
    const postProgram = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(AddProgramAsync({
        name: ProgramName,
        description: ProgramDesc,
        image: ProgramImg,
        programDuration: ProgramDur,
        orderOfWorkouts: ProgramOrd,
        programDifficulty: 1,
      }))
      .then(response => {
        console.log("Promise resolved", response);
        if (response.payload) {
          dispatch(setPlanId(response.payload));  // Set the plan ID in the state
          setIsFormSubmitted(true);  // Ensure this line is being reached
          // To store a variable
          localStorage.setItem('duration', ProgramDur);
    
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
                <input onChange={handleDur} type="radio" value="15" name="programDuration" checked={ProgramDur === '15'} />
                <span className="ml-2">15 days</span>
              </label>
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="30" name="programDuration" checked={ProgramDur === '30'} />
                <span className="ml-2">30 days</span>
              </label>
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="60" name="programDuration" checked={ProgramDur === '60'} />
                <span className="ml-2">60 days</span>
              </label>
            </div>
          </div>
  
        
          <div>
            <button onClick={postProgram} className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg focus:ring focus:ring-green-200" type="submit">Save</button>
          </div>
        </form>
      )
  );
  
}


export default AddProgramForm;